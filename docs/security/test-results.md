## Week 3 — Security Test Results

### XSS
**Test:** Submitted XSS payloads through task fields.

**Payloads:**
- `<script>alert("XSS")</script>`
- `<img src=x onerror=alert("XSS")>`

**Result:** Payload was rendered as text and JavaScript did not execute.

**Status:** PASS

---

### IDOR / Authorization
**Test:** Attempted to access another user's task.

**Result:** `404 - Task not found or not authorised`

**Status:** PASS

---

### SQL Injection
**Test:** Used SQL injection-style input in task search.

**Result:** No unauthorized data was returned.

**Status:** PASS

---

### Password Hashing
**Test:** Inspected authentication implementation and database.

**Result:** Passwords are hashed using bcrypt and stored as hashes.

**Status:** PASS

---

### Directory Traversal
**Test:** Searched the backend for file/path handling functionality.

**Result:** No file download or user-controlled filesystem path functionality exists.

**Status:** N/A

---

### Insecure File Upload
**Test:** Searched the backend for file-upload functionality.

**Result:** No file-upload endpoint exists.

**Status:** N/A

---

### Verbose Error Handling
**Tests:**
1. Non-existent endpoint → `404`
2. Malformed JSON → `400`
3. Invalid task ID → `404`

**Result:** No Python traceback, database credentials, filesystem paths, or other sensitive internal details were exposed.

**Status:** PASS