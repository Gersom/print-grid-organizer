/**
 * Card Grid Printer - Main JavaScript
 * Author: Gersom
 * Description: Organizes business card images in a grid layout for printing
 */

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');
const downloadBtn = document.getElementById('downloadBtn');
const previewCanvas = document.getElementById('previewCanvas');
const ctx = previewCanvas.getContext('2d');

// Paper size controls
const paperSizeSelect = document.getElementById('paperSize');
const customWidthGroup = document.getElementById('customWidthGroup');
const customHeightGroup = document.getElementById('customHeightGroup');
const customWidthInput = document.getElementById('customWidth');
const customHeightInput = document.getElementById('customHeight');

// Grid controls
const columnsInput = document.getElementById('columns');
const rowsInput = document.getElementById('rows');
const spacingInput = document.getElementById('spacing');
const marginInput = document.getElementById('margin');

// Image fit controls
const fitModeSelect = document.getElementById('fitMode');
const backgroundColorInput = document.getElementById('backgroundColor');

// State
let uploadedImage = null;

// Constants
const PAPER_SIZES = {
    a4: { width: 210, height: 297 },
    letter: { width: 216, height: 279 },
    legal: { width: 216, height: 356 },
    a5: { width: 148, height: 210 },
    a3: { width: 297, height: 420 },
    custom: { width: 210, height: 297 }
};

const PIXELS_PER_MM_AT_300DPI = 11.811023622; // Conversion factor from millimeters to pixels at 300 DPI

/**
 * Initialize event listeners
 */
function init() {
    setupUploadHandlers();
    setupPaperSizeHandler();
    setupPresetButtons();
    setupInputListeners();
    setupActionButtons();
}

/**
 * Setup file upload handlers
 */
function setupUploadHandlers() {
    // Click handler
    uploadSection.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadSection.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadSection.classList.add('dragover');
    });

    uploadSection.addEventListener('dragleave', () => {
        uploadSection.classList.remove('dragover');
    });

    uploadSection.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadSection.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            loadImage(file);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            loadImage(file);
        }
    });
}

/**
 * Setup paper size change handler
 */
function setupPaperSizeHandler() {
    paperSizeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customWidthGroup.style.display = 'flex';
            customHeightGroup.style.display = 'flex';
        } else {
            customWidthGroup.style.display = 'none';
            customHeightGroup.style.display = 'none';
            const size = PAPER_SIZES[this.value];
            customWidthInput.value = size.width;
            customHeightInput.value = size.height;
        }
        
        if (uploadedImage) {
            generatePreview();
        }
    });
}

/**
 * Setup preset buttons
 */
function setupPresetButtons() {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cols = this.dataset.cols;
            const rows = this.dataset.rows;
            columnsInput.value = cols;
            rowsInput.value = rows;
            
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (uploadedImage) {
                generatePreview();
            }
        });
    });
}

/**
 * Setup input listeners
 */
function setupInputListeners() {
    const inputs = [
        columnsInput, 
        rowsInput, 
        spacingInput, 
        marginInput, 
        customWidthInput, 
        customHeightInput, 
        fitModeSelect, 
        backgroundColorInput
    ];

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (uploadedImage) {
                generatePreview();
            }
        });
        
        input.addEventListener('change', () => {
            if (uploadedImage) {
                generatePreview();
            }
        });
    });
}

/**
 * Setup action buttons
 */
function setupActionButtons() {
    // Generate button
    generateBtn.addEventListener('click', generatePreview);

    // Print button
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Download button and dropdown
    const downloadDropdown = document.getElementById('downloadDropdown');
    
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        downloadDropdown.classList.remove('show');
    });

    // Handle format selection
    document.querySelectorAll('.download-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const format = e.target.dataset.format;
            downloadDropdown.classList.remove('show');
            downloadFile(format);
        });
    });
}

/**
 * Load image from file
 * @param {File} file - Image file to load
 */
function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            uploadedImage = img;
            generateBtn.disabled = false;
            uploadSection.innerHTML = `
                <div class="upload-icon">✅</div>
                <h3>Imagen cargada correctamente</h3>
                <p style="margin-top: 10px; color: #666;">${file.name}</p>
                <p style="margin-top: 5px; color: #666; font-size: 12px;">Haz clic para cambiar</p>
            `;
            generatePreview();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/**
 * Generate preview canvas
 */
function generatePreview() {
    if (!uploadedImage) return;

    const cols = parseInt(columnsInput.value);
    const rows = parseInt(rowsInput.value);
    const spacing = parseFloat(spacingInput.value);
    const margin = parseFloat(marginInput.value);
    const fitMode = fitModeSelect.value;
    const bgColor = backgroundColorInput.value;

    // Get paper dimensions
    const paperWidth = parseFloat(customWidthInput.value);
    const paperHeight = parseFloat(customHeightInput.value);

    // Set canvas to paper size in pixels
    const canvasWidth = paperWidth * MM_TO_PX;
    const canvasHeight = paperHeight * MM_TO_PX;
    
    previewCanvas.width = canvasWidth;
    previewCanvas.height = canvasHeight;

    // Clear canvas with background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate available space
    const marginPx = margin * MM_TO_PX;
    const spacingPx = spacing * MM_TO_PX;
    
    const availableWidth = canvasWidth - (2 * marginPx) - ((cols - 1) * spacingPx);
    const availableHeight = canvasHeight - (2 * marginPx) - ((rows - 1) * spacingPx);

    const cardWidth = availableWidth / cols;
    const cardHeight = availableHeight / rows;

    // Calculate image aspect ratio
    const imageAspectRatio = uploadedImage.width / uploadedImage.height;
    const cardAspectRatio = cardWidth / cardHeight;

    // Draw grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = marginPx + (col * (cardWidth + spacingPx));
            const y = marginPx + (row * (cardHeight + spacingPx));

            // Fill background
            ctx.fillStyle = bgColor;
            ctx.fillRect(x, y, cardWidth, cardHeight);

            // Draw the image based on fit mode
            drawImageWithFitMode(x, y, cardWidth, cardHeight, imageAspectRatio, cardAspectRatio, fitMode);

            // Draw border
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cardWidth, cardHeight);
        }
    }

    // Enable action buttons
    printBtn.disabled = false;
    downloadBtn.disabled = false;
}

/**
 * Draw image with specified fit mode
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} cardWidth - Card width
 * @param {number} cardHeight - Card height
 * @param {number} imageAspectRatio - Image aspect ratio
 * @param {number} cardAspectRatio - Card aspect ratio
 * @param {string} fitMode - Fit mode (fill, contain, cover)
 */
function drawImageWithFitMode(x, y, cardWidth, cardHeight, imageAspectRatio, cardAspectRatio, fitMode) {
    if (fitMode === 'fill') {
        // Stretch to fill entire card space
        ctx.drawImage(uploadedImage, x, y, cardWidth, cardHeight);
    } else if (fitMode === 'contain') {
        // Maintain aspect ratio, fit inside card
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imageAspectRatio > cardAspectRatio) {
            // Image is wider
            drawWidth = cardWidth;
            drawHeight = cardWidth / imageAspectRatio;
            drawX = x;
            drawY = y + (cardHeight - drawHeight) / 2;
        } else {
            // Image is taller
            drawHeight = cardHeight;
            drawWidth = cardHeight * imageAspectRatio;
            drawX = x + (cardWidth - drawWidth) / 2;
            drawY = y;
        }
        
        ctx.drawImage(uploadedImage, drawX, drawY, drawWidth, drawHeight);
    } else if (fitMode === 'cover') {
        // Maintain aspect ratio, cover entire card (may crop)
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imageAspectRatio > cardAspectRatio) {
            // Image is wider
            drawHeight = cardHeight;
            drawWidth = cardHeight * imageAspectRatio;
            drawX = x + (cardWidth - drawWidth) / 2;
            drawY = y;
        } else {
            // Image is taller
            drawWidth = cardWidth;
            drawHeight = cardWidth / imageAspectRatio;
            drawX = x;
            drawY = y + (cardHeight - drawHeight) / 2;
        }
        
        // Create clipping region
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, cardWidth, cardHeight);
        ctx.clip();
        ctx.drawImage(uploadedImage, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
    }
}

/**
 * Download file in specified format
 * @param {string} format - File format (png, jpg, webp, pdf)
 */
function downloadFile(format) {
    const paperWidth = parseFloat(customWidthInput.value);
    const paperHeight = parseFloat(customHeightInput.value);

    if (format === 'pdf') {
        downloadAsPDF(paperWidth, paperHeight);
    } else {
        downloadAsImage(format);
    }
}

/**
 * Download as PDF
 * @param {number} paperWidth - Paper width in mm
 * @param {number} paperHeight - Paper height in mm
 */
function downloadAsPDF(paperWidth, paperHeight) {
    const { jsPDF } = window.jspdf;
    
    // Convert mm to inches
    const pdfWidth = paperWidth * 0.393701;
    const pdfHeight = paperHeight * 0.393701;
    
    // Create PDF with custom dimensions
    const pdf = new jsPDF({
        orientation: paperWidth > paperHeight ? 'landscape' : 'portrait',
        unit: 'in',
        format: [pdfWidth, pdfHeight]
    });

    // Convert canvas to image and add to PDF
    const imgData = previewCanvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    // Download PDF
    pdf.save('tarjetas-grid.pdf');
}

/**
 * Download as image
 * @param {string} format - Image format (png, jpg, webp)
 */
function downloadAsImage(format) {
    let mimeType;
    let extension;
    let quality = 1.0;

    switch(format) {
        case 'jpg':
            mimeType = 'image/jpeg';
            extension = 'jpg';
            quality = 0.95;
            break;
        case 'webp':
            mimeType = 'image/webp';
            extension = 'webp';
            quality = 0.95;
            break;
        case 'png':
        default:
            mimeType = 'image/png';
            extension = 'png';
            break;
    }

    // Create download link
    previewCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `tarjetas-grid.${extension}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, mimeType, quality);
}

// Initialize the application
init();
