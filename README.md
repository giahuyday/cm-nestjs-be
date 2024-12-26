# Class managements APIs with NestJS

```
└── 📁cm-nestjs-be
    └── 📁data
        └── data.json
    └── 📁src
            └── 📁common
                └── 📁decorators
                └── 📁errors
                └── 📁filter
                └── 📁guards
            └── 📁course
                └── 📁dto
            └── 📁student
                └── 📁dto
            └── 📁utils
            └── app.controller.spec.ts
            └── app.controller.ts
            └── app.module.ts
            └── app.service.ts
            └── main.ts
    └── 📁test
    └── .eslintrc.js
    └── .gitignore
    └── .prettierrc
    └── nest-cli.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.build.json
    └── tsconfig.json
```

## Features

The migration includes:

1. **DTO Validation**: validate input data using `class-validator`, `class-transformers`.
2. **Error Handling**: build up custom exception filters to manage error response.
3. **Role-Based Access Control**: use `guards` authorize users with `bearer token` with 3 roles `admin`, `principal`, `teacher`

---

## **Running the Project**

### 1. Clone the Repository

```bash
git clone git@github.com:giahuyday/cm-nestjs-be.git
cd cm-nestjs-be
```

### 3. Install dependencies

```bash
npm i
```

### 4. Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

The server will start at `http://127.0.0.1:3000/`.

### 5. API Role Permissions

| Role      | Permissions                                    |
| --------- | ---------------------------------------------- |
| Admin     | Full access to all APIs.                       |
| Principal | CRUD operations on Classes, view student list. |
| Teacher   | CRUD operations on Students, view class list.  |

| API Chính            | Task                                                      | API                             | Body                                  | Params           |
| -------------------- | --------------------------------------------------------- | ------------------------------- | ------------------------------------- | ---------------- |
| **Quản lí học sinh** | Thêm Học Sinh                                             | `/student/api/create`           | `{ "name": value, "classId": value }` | None             |
|                      | Update thông tin học sinh                                 | `/student/api/update/:id`       | `{ "name": value, "classId": value }` | `id` (studentId) |
|                      | Xóa học sinh                                              | `/student/api/delete/`          | `{"id": value}`                       |                  |
|                      | Truy xuất tất cả danh sách học sinh                       | `/student/api/get_students`     | None                                  | None             |
|                      | Truy xuất thông tin HS theo ID                            | `/student/api/get_student/:id`  | None                                  | `id` (studentId) |
|                      | Truy xuất thông tin HS theo Name (search LIKE)            | `/student/api/get_by_name`      | `{ "name": value }`                   | None             |
|                      | Truy xuất tất cả học sinh theo Class (sử dụng Class Name) | `/student/api/get_by_classname` | `{ "name": value }`                   | None             |
| **Quản lí Lớp**      | Thêm 1 Lớp                                                | `/class/api/create`             | `{ "name": value}`                    | None             |
|                      | Update thông tin Lớp                                      | `/class/api/update/:id`         | `{ "name": value }`                   | `id` (classId)   |
|                      | Xóa Lớp (nếu lớp còn HS thì không được phép xóa)          | `/class/api/delete/`            | `{"id": value}`                       |                  |
|                      | Truy xuất thông tin Lớp theo ID                           | `/class/api/get_course/:id`     | None                                  | `id` (classId)   |

---
