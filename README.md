# Tutoring Platform

Una plataforma web para tutoría en línea que conecta estudiantes con tutores de manera eficiente y profesional.

## Descripción

Plataforma integral de tutoría en línea diseñada para facilitar la conexión entre estudiantes y tutores calificados, permitiendo la gestión de sesiones, seguimiento del progreso y evaluación de servicios.

## Características

- Sistema de registro y autenticación segura
- Perfiles profesionales de tutores y estudiantes
- Búsqueda y filtrado avanzado de tutores
- Reserva y gestión de sesiones en línea
- Sistema de calificaciones y reseñas
- Historial de sesiones y progreso académico

## Requisitos

- Node.js versión 16 o superior
- npm o yarn
- Conexión a internet

## Instalación

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Estructura del Proyecto

```
tutoring/
├── backend/          # API REST con Node.js/Express
├── frontend/         # Interfaz web con React
├── docs/             # Documentación adicional
└── README.md
```

## Arquitectura

### Diagrama de Arquitectura

La plataforma sigue una arquitectura cliente-servidor de tres capas:

```
┌─────────────────────────────────────────────────────────────┐
│                    Cliente (Frontend)                        │
│              React - Interfaz de Usuario                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                    HTTP/REST
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   API Gateway                                │
│           Node.js/Express - Servidor Backend                │
│     • Autenticación y Autorización                           │
│     • Manejo de Solicitudes                                  │
│     • Lógica de Negocio                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
            Base de Datos / Servicios
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Capa de Persistencia                            │
│     • Base de Datos (SQL/NoSQL)                              │
│     • Servicios Externos                                     │
│     • Cache                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Principales

**Backend:**
- API REST con rutas seguras
- Autenticación JWT
- Validación de datos
- Gestión de sesiones

**Frontend:**
- Interfaz responsiva
- Gestión de estado
- Consumo de API
- Experiencia de usuario optimizada

**Base de Datos:**
- Almacenamiento de usuarios
- Información de sesiones
- Historial y calificaciones

## Arquitectura Limpia

Este proyecto implementa los principios de **Clean Architecture** para mantener un código mantenible, escalable y testeable.

### Estructura de Capas

```
┌──────────────────────────────────────────┐
│         Controllers (Express)             │  Capa de Presentación
│    • Manejo de requests/responses          │
│    • Validación de entrada                 │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│         Use Cases / Services              │  Capa de Aplicación
│    • Lógica de negocio                    │
│    • Orquestación                         │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│       Domain / Entities & Interfaces      │  Capa de Dominio
│    • Reglas de negocio                    │
│    • Interfaces y contratos               │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│      Repositories & Infrastructure        │  Capa de Infraestructura
│    • Acceso a datos                       │
│    • Servicios externos                   │
└──────────────────────────────────────────┘
```

### Beneficios

- Independencia de frameworks
- Testeable y fácil de probar
- Independencia de la base de datos
- Separación clara de responsabilidades
- Fácil mantenimiento y escalabilidad

## Principios SOLID

El proyecto sigue los 5 principios SOLID para escribir código limpio y mantenible:

### 1. Single Responsibility Principle (SRP)

Cada clase tiene una única responsabilidad bien definida.

**Ejemplo:**
- `UserController`: Solo maneja las solicitudes HTTP de usuarios
- `UserService`: Contiene la lógica de negocio de usuarios
- `UserRepository`: Solo accede a los datos de usuarios

```
UserController -> maneja HTTP
UserService -> lógica de negocio
UserRepository -> acceso a BD
```

### 2. Open/Closed Principle (OCP)

Las entidades deben estar abiertas para extensión pero cerradas para modificación.

**Implementación:**
- Uso de interfaces para extender funcionalidad
- Inyección de dependencias
- Estrategias polimórficas

### 3. Liskov Substitution Principle (LSP)

Las clases derivadas pueden sustituir a sus clases base sin alterar el comportamiento.

**Aplicación:**
- Implementación consistente de interfaces
- Contratos claros en métodos
- Sin comportamientos sorpresa en subclases

### 4. Interface Segregation Principle (ISP)

Los clientes no deben depender de interfaces que no usan.

**Práctica:**
- Interfaces pequeñas y específicas
- Evitar interfaces "fat" (muy grandes)
- Cada interfaz con un propósito claro

```typescript
// Correcto: Interfaces segregadas
interface IUserReader {
  getUserById(id: string): Promise<User>;
}

interface IUserWriter {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserDTO): Promise<User>;
}

// Incorrecto: Interfaz muy grande
interface IUserService {
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
  sendEmail(to: string, message: string): Promise<void>;
  generateReport(): Promise<Report>;
}
```

### 5. Dependency Inversion Principle (DIP)

Las clases de alto nivel no deben depender de clases de bajo nivel. Ambas deben depender de abstracciones.

**Implementación:**
- Inyección de dependencias
- Usar interfaces, no implementaciones concretas
- Contenedor de DI (Inversión de Control)

```typescript
// Correcto: Depende de abstracción
class UserService {
  constructor(private userRepository: IUserRepository) {}
}

// Incorrecto: Acoplamiento directo
class UserService {
  private userRepository = new UserRepository();
}
```

## Patrones de Diseño Utilizados

### Repository Pattern

Abstrae el acceso a datos, permitiendo cambiar la fuente de datos sin afectar la lógica de negocio.

```
Domain Layer → Repository Interface
      ↑
      ├← MySQL Repository Implementation
      ├← MongoDB Repository Implementation
      └← Cache Repository Implementation
```

### Dependency Injection

Facilita el testing y la flexibilidad en la configuración de dependencias.

### Service Layer

Contiene la lógica de negocio, separada de los controladores y la persistencia.

## Tecnologías Utilizadas

- Backend: Node.js, Express
- Frontend: React
- Base de datos: [Especificar]
- Autenticación: JWT
- Patrones: Clean Architecture, SOLID Principles

## Flujo de Trabajo - Sprints

### Metodología

Utilizamos Scrum como metodología de desarrollo con sprints de 2 semanas.

### Ciclo de Sprint

```
┌─────────────────────────────────────────────────────────────┐
│                 PLANIFICACIÓN DEL SPRINT                    │
│  • Sprint Planning (2 horas)                                │
│  • Definición de objetivos                                  │
│  • Estimación de tareas (Story Points)                       │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              EJECUCIÓN DEL SPRINT (2 semanas)               │
│  • Daily Standup (15 minutos diarios)                       │
│  • Desarrollo de features                                   │
│  • Code Review y Testing                                    │
│  • Integración continua                                     │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                 REVISIÓN DEL SPRINT                         │
│  • Sprint Review (1.5 horas)                                │
│  • Demostración de features completadas                     │
│  • Feedback de stakeholders                                 │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│            RETROSPECTIVA DEL SPRINT                         │
│  • Sprint Retrospective (1 hora)                            │
│  • Análisis de qué salió bien                               │
│  • Identificación de mejoras                                │
│  • Acciones para el próximo sprint                          │
└─────────────────────────────────────────────────────────────┘
```

### Estructura de Tareas

Cada tarea es categorizada según su prioridad:

- **Must Have:** Crítico para el sprint
- **Should Have:** Importante pero puede posponerse
- **Could Have:** Nice to have
- **Won't Have:** No incluido en este sprint

### Roles del Equipo

- **Product Owner:** Define requisitos y prioridades
- **Scrum Master:** Facilita el proceso
- **Desarrollo:** Implementa las features
- **QA:** Asegura calidad

## Licencia

MIT

## Contacto

davinsonp@gmail.com