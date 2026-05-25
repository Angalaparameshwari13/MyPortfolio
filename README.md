# Premium Cinematic Portfolio - Angalaparameshwari A

This is a premium, cinematic-themed single-page portfolio website designed for **Angalaparameshwari A**, an **Embedded Software Developer**. The site utilizes a dark futuristic aesthetic with **sky-blue color accents**, visual hardware illustrations, a real-time debugging terminal emulator, responsive timelines, interactive particle grids, and custom modal windows for projects.

It also contains a Python utility for extracting text from PDF resumes.

---

## 🛠️ Technology Stack & Features

### Portfolio Website
*   **Structure:** Semantic HTML5 elements with accessibility markup.
*   **Styling:** Custom vanilla CSS3 focusing on glassmorphic panels, radial light leaks, and custom typography (using Google Fonts *Orbitron* & *Inter*).
*   **Interactivity:** Vanilla JavaScript handling custom typing animations, interactive canvas-based particle grids (representing hardware connections), a real-time diagnostic console emulator, scroll-triggered animation states, dynamic statistic loaders, and custom project modals.
*   **Communication widgets:** Dedicated floating WhatsApp contacts, direct action buttons, and responsive forms.

### Python Environment
*   **Python Version:** Python 3.x
*   **Virtual Environment:** `.venv` configuration.
*   **Dependencies:** `pypdf` for extracting resume data text.

---

## 📁 Repository Structure

```text
├── .venv/                   # Python virtual environment (hidden)
├── Angalaparameshwari (5)-5.pdf # Source resume PDF file
├── resume_content.txt       # Extracted plain text content from the PDF
├── read_pdf.py              # Python script used to extract PDF text
├── requirements.txt         # Dependencies file for Python components
├── index.html               # Main website markup page
├── style.css                # Custom cinematic sky-blue stylesheet
├── script.js                # Core interactive JavaScript features
└── README.md                # Project documentation (this file)
```

---

## 🚀 How to Run the Project

### Part 1: Setting up Python & PDF Text Extraction

If you need to re-run the Python script to extract details from the PDF resume file:

1.  **Open your terminal** (e.g., PowerShell on Windows) inside this directory:
    ```powershell
    cd "e:\angala\Embedded\Karthick\Portfolio\Angla"
    ```
2.  **Create a Virtual Environment** (if not already present):
    ```powershell
    python -m venv .venv
    ```
3.  **Activate the Virtual Environment**:
    *   **PowerShell:**
        ```powershell
        .\.venv\Scripts\Activate.ps1
        ```
    *   **Command Prompt (cmd):**
        ```cmd
        .\.venv\Scripts\activate.bat
        ```
4.  **Install dependencies**:
    ```powershell
    pip install -r requirements.txt
    ```
5.  **Run the script**:
    ```powershell
    python read_pdf.py
    ```
    *This will generate/overwrite `resume_content.txt` containing raw data from `Angalaparameshwari (5)-5.pdf`.*

---

### Part 2: Viewing the Portfolio Website

The portfolio is built entirely using vanilla frontend technologies (HTML, CSS, JS) and requires no build step or node server to run.

To view the website:
1.  Double-click `index.html` in your file explorer to open it directly in any web browser.
2.  Alternatively, you can run a local server (like Live Server extension in VS Code, or python `http.server`):
    ```powershell
    python -m http.server 8000
    ```
    And navigate to `http://localhost:8000` in your web browser.

---

## 📞 Contact Information (Embedded in Portfolio)
*   **Developer:** Angalaparameshwari A
*   **Role:** Embedded Software Developer
*   **Email:** angalaparameshwaria@gmail.com
*   **LinkedIn:** [linkedin.com/in/angalaparameshwari](https://linkedin.com/in/angalaparameshwari)
*   **WhatsApp Contact:** [+91 9150109792](https://wa.me/919150109792)
