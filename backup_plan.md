# Plan de Respaldos (Backups)

Este documento define la estrategia para asegurar la integridad y disponibilidad de la información de la base de datos `books_db`.

## 1. Información que será respaldada
- Estructura de la base de datos (tablas, secuencias e índices).
- Todos los registros insertados en la tabla `books` (datos de los libros, incluyendo autores, título y año de publicación).

## 2. Frecuencia de los respaldos
- **Respaldos completos (Full backups):** Diariamente a las 02:00 AM (hora local), cuando el tráfico en la API es mínimo.
- **Respaldos incrementales (Transaccionales/WAL):** Configurado continuamente, almacenando cambios cada 1 hora.

## 3. Lugar de almacenamiento
- **Nube (Principal):** Los archivos de respaldo se enviarán de forma encriptada a un bucket de almacenamiento seguro (ej. Amazon S3 o Google Cloud Storage).
- **Local (Secundario):** Se mantendrá una copia en un servidor dedicado de la empresa durante los últimos 7 días.

## 4. Procedimiento de recuperación ante fallos
En caso de pérdida de datos o corrupción en la base de datos principal, se seguirá este procedimiento:

1. **Notificación y Aislamiento:** Detener temporalmente los servicios de la API (para evitar escrituras corruptas) y alertar al equipo de infraestructura.
2. **Obtención del Respaldo:** Descargar el archivo `.sql` de respaldo más reciente desde el almacenamiento en la nube (S3).
3. **Restauración:**
   - Si la base de datos completa se perdió:
     ```bash
     psql -U postgres -d postgres -c "CREATE DATABASE books_db;"
     ```
   - Restaurar los datos desde el archivo usando la herramienta `pg_restore` o `psql`:
     ```bash
     psql -U postgres -d books_db < backup_latest.sql
     ```
4. **Verificación:** Ejecutar consultas de prueba y confirmar en la aplicación que la información es correcta.
5. **Reanudación del Servicio:** Levantar nuevamente los servicios de la API.
