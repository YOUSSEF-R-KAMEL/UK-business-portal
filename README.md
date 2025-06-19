# Company System

A modern Angular application with NGRX state management for managing company associates. Built with Angular 19, PrimeNG UI components, and JSON Server for the backend.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete associates
- ✅ **Advanced Filtering**: Search by name, email, phone, type, or group
- ✅ **Status Filtering**: Filter by active/inactive status
- ✅ **Toast Notifications**: User-friendly feedback messages
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **NGRX State Management**: Robust state management with effects
- ✅ **Form Validation**: Comprehensive form validation with error messages

## Quick Start

### Option 1: Automated Startup (Recommended)

**Using npm script:**
```bash
npm run dev
```

**Using Windows batch file:**
```bash
# Double-click start.bat or run:
start.bat
```

**Using PowerShell:**
```powershell
# Run in PowerShell:
.\start.ps1
```

### Option 2: Manual Startup

If you prefer to run servers separately:

**Terminal 1 - Angular App:**
```bash
npm start
```

**Terminal 2 - JSON Server:**
```bash
npm run start:api
```

### Option 3: Concurrent Startup

Run both servers with basic output:
```bash
npm run start:full
```

## Access Points

- **Frontend Application**: http://localhost:4200
- **API Server**: http://localhost:3000
- **API Endpoints**: http://localhost:3000/Associates

## Development server

The automated startup will run both the Angular development server and JSON Server concurrently. The application will automatically reload whenever you modify any of the source files.

## Available Scripts

- `npm run dev` - Start both servers with enhanced output
- `npm run start:full` - Start both servers with basic output
- `npm run start:app` - Start only Angular app
- `npm run start:api` - Start only JSON Server
- `npm start` - Start only Angular app (alias for start:app)
- `npm run build` - Build the project for production
- `npm test` - Run unit tests

## Project Structure

```
src/
├── app/
│   ├── Components/
│   │   ├── add-associate/     # Add/Edit associate dialog
│   │   ├── associate-list/    # Main associate list with filtering
│   │   └── shared/
│   │       └── form-input/    # Reusable form input component
│   ├── Services/
│   │   ├── associate.service.ts    # API service
│   │   └── toast.service.ts        # Toast notifications
│   └── Store/
│       ├── actions/           # NGRX actions
│       ├── effects/           # NGRX effects
│       ├── reducers/          # NGRX reducers
│       ├── selectors/         # NGRX selectors
│       └── Models/            # TypeScript interfaces
├── db.json                    # JSON Server database
└── start.js                   # Custom startup script
```

## Technologies Used

- **Frontend**: Angular 19, TypeScript, PrimeNG, PrimeFlex
- **State Management**: NGRX (Store, Effects, Router Store, DevTools)
- **Backend**: JSON Server
- **UI Components**: PrimeNG (Table, Dialog, Toast, ConfirmDialog, etc.)
- **Styling**: SCSS, PrimeFlex CSS utilities

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

## Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Running unit tests

To execute unit tests with the Karma test runner:

```bash
ng test
```

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [NGRX Documentation](https://ngrx.io/)
- [PrimeNG Documentation](https://primeng.org/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
