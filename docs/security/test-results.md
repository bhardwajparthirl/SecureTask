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

## Week 5 - Dependency Security Assessment

### 1. OWASP Dependency-Check

Tool: OWASP Dependency-Check

Scope:
- Frontend and backend project dependencies

Result:
- Scan completed successfully
- HTML report generated at `dependency-check-report/dependency-check-report.html`
- CVE count observed in the report: 0
- Highest severity: 0

Status: PASS

---

### 2. pip-audit

Tool: pip-audit 2.10.1

Application dependency audit:

Command:
`pip-audit -r backend/requirements.txt`

Result:
- No known vulnerabilities found

Status: PASS

Environment audit:

Command:
`pip-audit`

Result:
- 1 known vulnerability found in `nltk 3.10.3`
- Vulnerability ID: `PYSEC-2026-3740`
- NLTK is not listed in the application's `requirements.txt`
- NLTK is installed as a dependency of the Safety security-scanning tool

Status: Informational / Tooling Dependency Finding

No SecureTask application dependency was identified as vulnerable by pip-audit.

---

### 3. Safety

Tool: Safety 3.8.1

Application dependency scan:

Command:
`safety scan`

Result:
- `requirements.txt`: No issues found
- `venv/pyvenv.cfg`: No issues found
- Safety reported 1 vulnerability in the complete environment
- The vulnerability was ignored by the active Safety policy
- No scan-failing vulnerabilities were matched
- Exit code: 0

Status: PASS for application dependencies

Note:
The Safety scan operates on the development environment as well as the project requirements. The identified environment-level finding is associated with a tooling dependency rather than a SecureTask runtime dependency.

---

### Week 5 Summary

| Tool | Scope | Result | Status |
|------|-------|--------|--------|
| OWASP Dependency-Check | Project dependencies | 0 CVEs | PASS |
| pip-audit | SecureTask requirements.txt | 0 vulnerabilities | PASS |
| pip-audit | Complete virtual environment | 1 tooling dependency finding | INFORMATIONAL |
| Safety | SecureTask requirements.txt | 0 issues | PASS |
| Safety | Complete virtual environment | 1 policy-ignored finding | INFORMATIONAL |

Conclusion:

No known vulnerabilities were identified in SecureTask's declared application dependencies.

The additional NLTK finding exists in the development virtual environment because NLTK is required by the Safety security-scanning tool. It is not a declared SecureTask application dependency, so no application dependency remediation was required.
