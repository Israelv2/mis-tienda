# Mi Tienda · Natura y Avon

App de la consultora: pedidos, boletas PDF, clientas, catálogo e histórico de ventas.
Funciona como **APK en el celular Android** y como **app web en la computadora** (GitHub Pages).
Los dos se sincronizan solos a través de **Firebase** (gratis para este uso) y funcionan también sin internet: lo que se hace sin conexión se sube al volver la señal.

Las boletas que se descargan en el celular quedan en
`Documentos/MiTienda/Clientes/<código y nombre>/<fecha y nº de boleta>/`.

---

## Paso 1 · Firebase (una sola vez, unos 10 minutos)

1. Entra a <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Nombre: `mi-tienda`. Puedes desactivar Google Analytics.
2. Menú izquierdo **Compilación › Authentication › Comenzar**. En la pestaña *Método de acceso* activa **Correo electrónico/contraseña** y guarda.
3. Menú **Compilación › Firestore Database › Crear base de datos**. Ubicación: `southamerica-east1 (São Paulo)`. Modo: **producción**.
4. En Firestore, pestaña **Reglas**: borra lo que haya, pega el contenido del archivo `firestore.rules` de esta carpeta y pulsa **Publicar**.
5. Engranaje ⚙ **Configuración del proyecto › General › Tus apps** › icono **Web `</>`**. Apodo `mi-tienda-web` (no marques Hosting) › **Registrar app**.
6. Copia los valores que aparecen en `firebaseConfig` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) y pégalos en `www/firebase-config.js` en lugar de los vacíos.
   *Estos datos no son secretos: Firebase los protege con las reglas del paso 4 y con la clave de la consultora.*
7. **Authentication › Configuración › Dominios autorizados › Agregar dominio**: `TU-USUARIO.github.io` (con tu usuario de GitHub).

## Paso 2 · GitHub (una sola vez)

1. Crea un repositorio nuevo, por ejemplo `mi-tienda`. Déjalo **público** (GitHub Pages es gratis en repos públicos; los datos de clientas y ventas NO están en el repo, están en Firebase).
2. Sube **todo el contenido** de esta carpeta. Con GitHub Desktop: *Add existing repository* › *Publish*. O desde la web: *Add file › Upload files* y arrastra las carpetas.
3. **Settings › Secrets and variables › Actions › New repository secret**
   - Name: `KEYSTORE_B64`
   - Secret: el texto completo del archivo `keystore-base64.txt` (está en la carpeta `firma-apk`, **fuera** del repo; no lo subas).
   Así cada APK nueva se instala encima de la anterior sin perder nada.
4. **Settings › Pages › Build and deployment › Source: GitHub Actions**.
5. **Los dos procesos automáticos** (están en la carpeta `workflows-para-github`): en la web del repo pulsa *Add file › Create new file*, escribe como nombre `.github/workflows/android.yml`, pega el contenido de `workflows-para-github/android.yml` y pulsa *Commit changes*. Repite con `.github/workflows/web.yml` y el archivo `web.yml`.
   *(Por seguridad, no puedo crear la carpeta `.github` en tu computadora; por eso van aparte.)*
6. Pestaña **Actions**: verás dos procesos, *APK Android* y *Web para la computadora*. Si alguno falló, entra y pulsa **Re-run all jobs**.

## Paso 3 · Instalar

**Celular (Android)**
1. En el repo, **Releases** (columna derecha) › la última versión › descarga `MiTienda-1.N.apk`.
2. Ábrela. Android pedirá permitir *instalar apps desconocidas* para el navegador o Archivos: acepta e instala.
3. Aparece el icono **Mi Tienda** con los dos logos.

**Computadora (Windows 11)**
1. Abre `https://TU-USUARIO.github.io/mi-tienda/` en Edge o Chrome.
2. Edge: menú `···` › *Aplicaciones* › **Instalar este sitio como aplicación**. Chrome: icono de instalar en la barra de direcciones.

**iPhone**: abre la misma dirección web en Safari › Compartir › *Añadir a pantalla de inicio*.

## Paso 4 · Primer uso

- En **un** dispositivo pulsa **¿Primera vez? Crear acceso**: nombre, código de consultora y clave de 6 a 8 caracteres. Se carga solo el catálogo del ciclo 15 (843 productos Natura y 760 Avon).
- En los demás dispositivos: **Entrar** con el mismo código y clave.
- Opcional: Configuración › **Crear PIN numérico** para entrar rápido.
- Si ya usaste la versión de claude.ai: allí, Configuración › *Copia de seguridad (JSON)*; aquí, Configuración › **Restaurar copia**.

## Actualizaciones

- Cada vez que subas cambios al repo, GitHub genera sola una APK nueva en **Releases** y actualiza la web.
- En el celular instala la APK nueva encima de la anterior: los datos se conservan (están en Firebase y en el propio celular).
- Catálogo de cada ciclo: dentro de la app, **Productos › Actualizar con revista digital** y sube el PDF de la revista.

## Contenido

| Ruta | Qué es |
|---|---|
| `www/` | La app (HTML, JS, imágenes, catálogo inicial, librerías locales) |
| `www/firebase-config.js` | Donde pegas la configuración de Firebase |
| `firestore.rules` | Reglas de seguridad de la base de datos |
| `capacitor.config.json`, `package.json` | Configuración para generar la APK |
| `assets/` | Icono y pantalla de inicio de la APK |
| `workflows-para-github/android.yml` | Genera la APK automáticamente (va en `.github/workflows/`) |
| `workflows-para-github/web.yml` | Publica la versión web en GitHub Pages (va en `.github/workflows/`) |

App personal de gestión de la consultora. No es una app oficial de Natura ni de Avon.
La boleta es un comprobante interno de venta (no es boleta electrónica SUNAT).
