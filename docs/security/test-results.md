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

---

## Week 4 — SAST & Secret Scanning

### Bandit

**Tool:** Bandit 1.9.4

**Initial Scan:**
- Scope: SecureTask backend
- Virtual environment excluded
- Lines scanned: 342
- High severity: 1
- Medium severity: 0
- Low severity: 1

**Findings:**

1. **B105 — Hardcoded Password String**
   - Location: `backend/app.py`
   - Issue: JWT secret was hardcoded in application source code.
   - Remediation: Moved the JWT secret to environment configuration and loaded it through `config.py`.

2. **B201 — Flask Debug Enabled**
   - Location: `backend/app.py`
   - Issue: Flask application was running with `debug=True`.
   - Remediation: Changed Flask configuration to `debug=False`.

**Final Scan:**
- High severity: 0
- Medium severity: 0
- Low severity: 0

**Status:** PASS

---

### Semgrep

**Tool:** Semgrep 1.175.0

**Configuration:** Semgrep OSS `auto` configuration.

**Results:**
- Rules executed: 290
- Targets scanned: 12
- Findings: 0
- Blocking findings: 0

**Status:** PASS

**Scope Note:** The scan used Semgrep OSS. Additional Semgrep Code/Supply Chain rules were not included because the CLI was not authenticated.

---

### Gitleaks

**Tool:** Gitleaks 8.30.1

**Test:** Git repository secret scanning.

**Results:**
- Git commits scanned: 9
- Repository data scanned: approximately 279.90 KB
- Leaks found: 0

**Status:** PASS

---

## Week 4 Summary

| Security Tool | Result |
|---|---|
| Bandit | PASS — 0 findings after remediation |
| Semgrep OSS | PASS — 0 findings |
| Gitleaks | PASS — 0 leaks |

**Week 4 SAST & Secret Scanning: COMPLETE**