# Security & Code Fixes Report - Task 2

This document details the critical errors found, the code modifications applied, and a guide for future development.

## 1. Critical Errors & Code Updates

### A. Broken Permission Logic (Backend)
**File:** `server/middleware/authMiddleWare.js`

**The Error:**
 The code checked for a singular `permission` object, but the JWT token contained a plural `permissions` array. It also failed to handle the array structure correctly.

**🔴 Before (Broken Code):**
```javascript
const checkAccess = (requiredPerm) => {
    return (req, res, next) => {
        const {role, permission} = req.user // Error: 'permission' is undefined
        
        // Error: Checks for object key, but data is an array
        if(permission && permission[requiredPerm] === true){
            return next();
        }
        return res.status(403).send(...)
    }
}
```

**🟢 After (Fixed Code):**
```javascript
const checkAccess = (requiredPerm) => {
    return (req, res, next) => {
        // Fix: Use 'permissions' (plural) and default to empty array
        const { role, permissions = [] } = req.user;

        if (role === 'admin') return next();

        // Fix: Use .includes() for array check
        if (permissions.includes(requiredPerm)) {
            return next();
        }

        return res.status(403).send({ status: false, message: 'Permission Denied.' });
    }
}
```

---

### B. Unprotected API Routes (Backend)
**File:** `server/routers/dimondRoutes.js`

**The Error:**
Critical routes for inserting, updating, and deleting data were publicly accessible. No token verification or permission checks were applied.

**🔴 Before (Unsafe):**
```javascript
// Anyone can call this!
DimondRouter.post('/insert', insertStoneGroup) 
DimondRouter.put('/deleteDiamond/:id', deleteDimond)
```

**🟢 After (Secured):**
```javascript
const { verifyToken, checkAccess } = require('../middleware/authMiddleWare');

// Verified User AND Specific Permission required
DimondRouter.post('/insert', verifyToken, checkAccess('stoneGroup_write'), insertStoneGroup)
DimondRouter.put('/deleteDiamond/:id', verifyToken, checkAccess('Diamond_delete'), deleteDimond)
```

---

### C. Authentication Headers Misplaced (Frontend)
**File:** `dimond/src/api/dimondServer.js`

**The Error:**
When calling `deleteDiamond`, the headers object was passed as the *second* argument to `axios.put`. In `PUT` requests, the second argument is the **body** (data), and the third is the **config** (headers). The server received no token.

**🔴 Before (Buggy):**
```javascript
export const deleteDiamond = async (id) => {
    // Error: Headers passed as data body
    const res = await axios.put(`${SERVER_URL}/deleteDiamond/${id}`, {
        headers: getHeaders() 
    })
    return res.data
}
```

**🟢 After (Fixed via Axios Instance):**
```javascript
import axiosInstance from './axiosInstance';

export const deleteDiamond = async (id) => {
    // Fix: Use axiosInstance (auto-attaches token)
    // Fix: Headers handled automatically, no 3rd arg needed here
    const res = await axiosInstance.put(`/deleteDiamond/${id}`)
    return res.data
}
```

---

### D. Permission Changes Not Applied Immediately (Full Stack)
**Problem:**
If an admin changed a user's permissions, the user could still use their old token (with old permissions) until it expired (24h).

**The Solution:**
We implemented a `tokenVersion` system.

1.  **Backend (`models/user.model.js`):** Added `tokenVersion: Number`.
2.  **Backend (`controllers/auth.controller.js`):** Increment `tokenVersion` when permissions update.
3.  **Backend (`middleware/authMiddleWare.js`):**
    ```javascript
    // Inside verifyToken
    if (decoded.tokenVersion !== user.tokenVersion) {
        return res.status(401).send({ message: 'Permissions changed. Login again.' });
    }
    ```
4.  **Frontend (`App.jsx`):**
    Added a session check on page load.
    ```javascript
    useEffect(() => {
        if (!token) return;
        // Calls simple endpoint /me
        checkSession().catch(() => {
           // If 401 (version mismatch), axios interceptor redirects to login
        });
    }, [token]);
    ```

---

## 2. Checklist for Future Development

When you repeat these tasks, remember this sequence:

1.  **Define Permissions:**
    *   Decide what specific string (e.g., `'Diamond_delete'`) controls the action.

2.  **Secure the Route (Backend):**
    *   Go to `router.js`.
    *   Import `verifyToken` and `checkAccess`.
    *   Wrap the route: `router.post('/path', verifyToken, checkAccess('PERM_NAME'), controller)`.

3.  **Check the Token Payload:**
    *   Ensure your `login` controller puts the correct data (arrays vs objects) into the JWT.

4.  **Call the API Correctly (Frontend):**
    *   Always use `axiosInstance`.
    *   For `POST`/`PUT`: `axiosInstance.post('/url', data)`.
    *   For `GET`/`DELETE`: `axiosInstance.get('/url')`.
    *   *Never* manually type `headers: { Authorization... }` again.
