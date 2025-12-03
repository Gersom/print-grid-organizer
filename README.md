# 📇 Print Grid Organizer

Una herramienta web para organizar diseños de tarjetas personales en una cuadrícula perfecta para impresión en diferentes tamaños de papel.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🌐 Demo

🔗 **GitHub Repository**: [https://github.com/Gersom/print-grid-organizer](https://github.com/Gersom/print-grid-organizer)

## 🎯 Características

- ✅ **Múltiples tamaños de papel**: A4, Letter, Legal, A5, A3, o dimensiones personalizadas
- 🎨 **Cuadrícula personalizable**: Configura columnas, filas, espaciado y márgenes
- 🖼️ **Modos de ajuste de imagen**:
  - **Rellenar**: Estira la imagen para ocupar todo el espacio
  - **Contener**: Mantiene la proporción original dentro del espacio
  - **Cubrir**: Mantiene la proporción cubriendo todo el espacio
- 💾 **Múltiples formatos de descarga**: PNG, JPG, WebP, PDF
- 🖨️ **Impresión directa**: Envía tu diseño directamente a la impresora
- ⚡ **Presets rápidos**: Configuraciones predefinidas para casos comunes
- 🎨 **Color de fondo personalizable**: Elige el color para espacios vacíos
- 📱 **Diseño responsive**: Funciona perfectamente en móviles, tablets y desktop

## 🚀 Demo

Simplemente abre `index.html` en tu navegador web favorito.

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/Gersom/print-grid-organizer.git
```

2. Navega al directorio:
```bash
cd print-grid-organizer
```

3. Abre `index.html` en tu navegador.

¡No requiere instalación de dependencias ni servidor web!

## 🎮 Uso

1. **Sube tu imagen**: Arrastra y suelta tu diseño de tarjeta o haz clic para seleccionar
2. **Selecciona el tamaño de papel**: Elige entre los presets o define dimensiones personalizadas
3. **Configura la cuadrícula**: Define columnas, filas, espaciado y márgenes
4. **Elige el modo de ajuste**: Selecciona cómo quieres que se escale tu imagen
5. **Genera vista previa**: Revisa cómo quedará antes de imprimir
6. **Descarga o imprime**: Elige tu formato preferido

### Ejemplos de uso comunes:

#### 10 tarjetas en A4 vertical:
- Preset: **2x5** (2 columnas, 5 filas)
- Papel: A4 (210 x 297 mm)
- Modo: Contener (para mantener proporciones)

#### 10 tarjetas en A4 horizontal:
- Preset: **5x2** (5 columnas, 2 filas)
- Papel: A4 (210 x 297 mm)
- Modo: Contener

#### Tarjetas personalizadas:
- Papel: Personalizado
- Define ancho y alto según tu necesidad
- Ajusta columnas y filas manualmente

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno y responsivo
- **JavaScript (Vanilla)**: Funcionalidad sin dependencias
- **Canvas API**: Renderizado de imágenes
- **jsPDF**: Generación de archivos PDF

## 📁 Estructura del proyecto

```
print-grid-organizer/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño
├── main.js            # Lógica de la aplicación
├── README.md          # Documentación
├── LICENSE            # Licencia MIT
└── .gitignore         # Archivos ignorados por Git
```

## 🔧 Configuración avanzada

### Formatos de imagen soportados
- PNG (recomendado para transparencias)
- JPG/JPEG
- GIF
- WebP

### Formatos de descarga
- **PNG**: Sin pérdida, máxima calidad
- **JPG**: Comprimido, calidad 95%
- **WebP**: Moderno, mejor compresión
- **PDF**: Dimensiones exactas del papel

### Tamaños de papel predefinidos
| Tamaño | Ancho | Alto |
|--------|-------|------|
| A4     | 210mm | 297mm |
| Letter | 216mm | 279mm |
| Legal  | 216mm | 356mm |
| A5     | 148mm | 210mm |
| A3     | 297mm | 420mm |

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Soporte para múltiples imágenes diferentes en la misma hoja
- [ ] Rotación de imágenes individuales
- [ ] Plantillas prediseñadas
- [ ] Modo de vista previa antes de cargar imagen
- [ ] Exportar configuración como JSON
- [ ] Temas de color personalizables
- [ ] Soporte para SVG
- [ ] PWA (Progressive Web App)

## 🐛 Reportar bugs

Si encuentras algún bug, por favor abre un issue en [GitHub Issues](https://github.com/Gersom/print-grid-organizer/issues) describiendo:
- El problema encontrado
- Pasos para reproducirlo
- Comportamiento esperado
- Capturas de pantalla (si aplica)

## 👤 Autor

**Gersom**
- Desarrollador FullStack
- Especializado en Frontend (React, Vue) y Backend (Node.js)
- 10+ años de experiencia

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Agradecimientos

- jsPDF por la librería de generación de PDFs
- A la comunidad de desarrolladores por el feedback y sugerencias

---

⭐ Si este proyecto te fue útil, considera darle una estrella en [GitHub](https://github.com/Gersom/print-grid-organizer)!

**Hecho con ❤️ por Gersom**
