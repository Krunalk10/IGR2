# Test Cases & Validation Rules

## Login Form Validation

### Test Case 1: Empty Login ID
**Steps:**
1. Leave Login ID empty
2. Fill Password: `test123`
3. Fill CAPTCHA: `4568954`
4. Click LOGIN

**Expected Result:**
- Error message: "Login ID is required"
- Red border on Login ID field

### Test Case 2: Invalid Login ID Length
**Steps:**
1. Enter Login ID: `ab` (too short)
2. Fill Password: `test123`
3. Fill CAPTCHA: `4568954`
4. Click LOGIN

**Expected Result:**
- Error message: "Login ID must be between 3 and 50 characters"

### Test Case 3: Empty Password
**Steps:**
1. Fill Login ID: `admin@drs.maharashtra.gov.in`
2. Leave Password empty
3. Fill CAPTCHA: `4568954`
4. Click LOGIN

**Expected Result:**
- Error message: "Password is required"
- Red border on Password field

### Test Case 4: Short Password
**Steps:**
1. Fill Login ID: `admin@drs.maharashtra.gov.in`
2. Enter Password: `123` (too short)
3. Fill CAPTCHA: `4568954`
4. Click LOGIN

**Expected Result:**
- Error message: "Password must be at least 6 characters"

### Test Case 5: Empty CAPTCHA
**Steps:**
1. Fill Login ID: `admin@drs.maharashtra.gov.in`
2. Fill Password: `admin123`
3. Leave CAPTCHA empty
4. Click LOGIN

**Expected Result:**
- Error message: "CAPTCHA is required"

### Test Case 6: Incorrect CAPTCHA
**Steps:**
1. Fill Login ID: `admin@drs.maharashtra.gov.in`
2. Fill Password: `admin123`
3. Enter CAPTCHA: `1234567` (wrong)
4. Click LOGIN

**Expected Result:**
- Error message: "CAPTCHA is incorrect"

### Test Case 7: Successful Login
**Steps:**
1. Fill Login ID: `admin@drs.maharashtra.gov.in`
2. Fill Password: `admin123`
3. Fill CAPTCHA: `4568954`
4. Click LOGIN

**Expected Result:**
- Success message: "Login successful! Redirecting..."
- Page redirects to `/dashboard`
- Dashboard shows role management page

### Test Case 8: Password Visibility Toggle
**Steps:**
1. Fill Password field with: `admin123`
2. Click eye icon (👁️)
3. Password should be visible
4. Click eye icon again
5. Password should be hidden

**Expected Result:**
- Password visibility toggles
- Icon changes to indicate state (👁️ ↔ 🙈)

### Test Case 9: Tab Switching
**Steps:**
1. Click different tabs: ADMIN → IGR → DIG → JDR → SRO
2. Observe header and form

**Expected Result:**
- Tab highlight changes
- Header shows current tab name (e.g., "IGR Login")
- Form persists data (values stay if you switch back)

## Role Management Form Validation

### Test Case 10: Empty English Role Name
**Steps:**
1. On Create Role page
2. Leave ROLE NAME (ENGLISH) empty
3. Fill Marathi name: `परीक्षक`
4. Click CREATE ROLE

**Expected Result:**
- Error message: "English role name is required"
- Red border on English name field

### Test Case 11: Short English Role Name
**Steps:**
1. Enter English name: `AB` (too short)
2. Fill Marathi name: `परीक्षक`
3. Click CREATE ROLE

**Expected Result:**
- Error message: "English role name must be between 3 and 100 characters"

### Test Case 12: Empty Marathi Role Name
**Steps:**
1. Fill English name: `Test Officer`
2. Leave ROLE NAME (MARATHI) empty
3. Click CREATE ROLE

**Expected Result:**
- Error message: "Marathi role name is required"
- Red border on Marathi name field

### Test Case 13: Short Marathi Role Name
**Steps:**
1. Fill English name: `Test Officer`
2. Enter Marathi name: `अ` (single character)
3. Click CREATE ROLE

**Expected Result:**
- Error message: "Marathi role name must be between 3 and 100 characters"

### Test Case 14: Description Exceeds Character Limit
**Steps:**
1. Fill English name: `Test Officer`
2. Fill Marathi name: `परीक्षक`
3. Enter description with 501+ characters
4. Click CREATE ROLE

**Expected Result:**
- Input limited to 500 characters (won't accept more)
- Character counter shows "500/500"
- Error message appears

### Test Case 15: Successful Role Creation
**Steps:**
1. Fill English name: `Compliance Officer`
2. Fill Marathi name: `अनुपालन अधिकारी`
3. Fill description: `Responsible for ensuring regulatory compliance`
4. Select status: `Active`
5. Click CREATE ROLE

**Expected Result:**
- Success message: "Role created successfully!"
- 1.5 second delay
- Redirect to dashboard (`/dashboard`)

### Test Case 16: Role Status Radio Buttons
**Steps:**
1. On Create Role page
2. Select "Active" radio
3. Select "Inactive" radio
4. Verify visual feedback

**Expected Result:**
- Only one radio button can be selected
- Selected radio has filled circle indicator
- Status correctly reflects selection

### Test Case 17: Created By Field
**Steps:**
1. On Create Role page
2. Observe "CREATED BY (READ-ONLY)" field

**Expected Result:**
- Field contains "Super Admin"
- Field is disabled (can't be edited)
- Field has gray background to indicate read-only status

### Test Case 18: Cancel Button
**Steps:**
1. On Create Role page
2. Fill some fields with data
3. Click CANCEL button

**Expected Result:**
- Redirects to `/dashboard`
- Data is not saved

### Test Case 19: Back to Role List
**Steps:**
1. On Create Role page
2. Click "← Back to Role List"

**Expected Result:**
- Returns to role management dashboard
- Role list is displayed

## Role List & Search

### Test Case 20: Search by Role Name
**Steps:**
1. On dashboard, in search box
2. Enter "System"
3. Observe results

**Expected Result:**
- Only "System Administrator" role shows
- Other roles are filtered out

### Test Case 21: Search by Marathi Name
**Steps:**
1. In search box
2. Enter Marathi text (e.g., "प्रणाली")
3. Observe results

**Expected Result:**
- Matching Marathi role shows
- Search is case-insensitive

### Test Case 22: Search by Description
**Steps:**
1. In search box
2. Enter "property"
3. Observe results

**Expected Result:**
- "Sub Registrar" role appears (has "property" in description)
- Other roles filtered out

### Test Case 23: Search by Role ID
**Steps:**
1. In search box
2. Enter "ROLE_002"
3. Observe results

**Expected Result:**
- Only ROLE_002 (Sub Registrar) displays
- Other roles are hidden

### Test Case 24: Status Filter - Active Only
**Steps:**
1. Click STATUS dropdown
2. Select "Active"
3. Observe list

**Expected Result:**
- Only active roles (4 roles) display
- Verification Officer (Inactive) is hidden

### Test Case 25: Status Filter - Inactive Only
**Steps:**
1. Click STATUS dropdown
2. Select "Inactive"
3. Observe list

**Expected Result:**
- Only Verification Officer displays
- All active roles are hidden

### Test Case 26: Status Filter - All Roles
**Steps:**
1. Click STATUS dropdown
2. Select "All Roles"
3. Observe list

**Expected Result:**
- All 5 roles display (Active + Inactive)

### Test Case 27: Search + Filter Combination
**Steps:**
1. Type "Officer" in search
2. Filter by "Active" status

**Expected Result:**
- Shows "Data Entry Operator" (Active, contains "Officer")
- Verification Officer hidden (Inactive)

### Test Case 28: Refresh Button
**Steps:**
1. Apply filters/search
2. Click refresh button (🔄)
3. Observe list

**Expected Result:**
- Filters/search are cleared
- All roles display again

### Test Case 29: View Role Details
**Steps:**
1. In role list
2. Click 👁️ icon on any role
3. Modal should open

**Expected Result:**
- Modal displays: Role Details
- Shows: ID, English name, Marathi name, Status
- Shows: Created by, Created on, Updated by, Updated on
- Shows: Full description
- Close button present

### Test Case 30: Close Details Modal
**Steps:**
1. Open role details modal
2. Click "Close Details" button

**Expected Result:**
- Modal closes
- Returns to role list

### Test Case 31: Role List Pagination
**Steps:**
1. Observe pagination controls
2. Check "Showing X of Y roles"

**Expected Result:**
- Shows "Showing 1 to 5 of 5 roles" (all 5 fit on one page)
- Pagination controls are visible

### Test Case 32: Change Rows per Page
**Steps:**
1. Click "5" in rows per page dropdown
2. Try different options (5, 10, 20)

**Expected Result:**
- Page updates to show selected number of rows
- All available options work

## Navigation

### Test Case 33: Sidebar Menu
**Steps:**
1. On dashboard
2. Observe sidebar with menu items
3. Click "Role Management" (already selected)

**Expected Result:**
- Sidebar shows: Role Management, Office Management, Employee Management, Zone Management
- Active item highlighted in blue
- Role Management already selected

### Test Case 34: Logout Button
**Steps:**
1. On dashboard
2. Click "🚪 Logout" in sidebar

**Expected Result:**
- Currently not implemented (stub button)
- Should redirect to login (future enhancement)

### Test Case 35: Header Navigation
**Steps:**
1. Observe dashboard header
2. Check all icons present

**Expected Result:**
- Department logo and name
- Help Desk button (❓)
- Language selector (English ▼)
- Notification bell (🔔)
- Profile button (👤)
- Exit button (⤴️)

### Test Case 36: Breadcrumb Navigation
**Steps:**
1. On dashboard
2. Click "Role Management" in breadcrumb

**Expected Result:**
- Breadcrumb shows: System Administration › Role Management
- Links are clickable

## Responsive Design

### Test Case 37: Desktop View (1920x1080)
**Steps:**
1. Set viewport to 1920x1080
2. View login page and dashboard

**Expected Result:**
- All elements properly aligned
- Text readable
- No horizontal scroll needed

### Test Case 38: Tablet View (768x1024)
**Steps:**
1. Set viewport to 768x1024
2. View login page and dashboard

**Expected Result:**
- Layout adapts properly
- Sidebar still visible
- Tables scrollable horizontally if needed

### Test Case 39: Mobile View (375x667)
**Steps:**
1. Set viewport to 375x667
2. View login page and dashboard

**Expected Result:**
- Layout stacks vertically
- Sidebar becomes drawer (if implemented)
- Touch-friendly button sizes

## Data Validation Rules Summary

| Field | Min Length | Max Length | Required | Format |
|-------|-----------|-----------|----------|--------|
| Login ID | 3 | 50 | Yes | Text |
| Password | 6 | - | Yes | Text |
| CAPTCHA | Exact match | Exact match | Yes | Numeric |
| Role Name (EN) | 3 | 100 | Yes | Text |
| Role Name (MA) | 3 | 100 | Yes | Text |
| Description | 0 | 500 | No | Text |

## Success Criteria

✅ All form fields validate correctly
✅ Error messages appear on invalid data
✅ Search filters work with combined criteria
✅ Modal opens/closes without issues
✅ Pagination displays correctly
✅ Navigation between pages works
✅ Responsive layout adapts to screen size
✅ Static data displays properly
✅ All buttons are functional (except stubbed features)
