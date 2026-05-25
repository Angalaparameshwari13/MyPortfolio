import os
from pypdf import PdfReader

pdf_path = "Angalaparameshwari (5)-5.pdf"
reader = PdfReader(pdf_path)
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("resume_content.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("Extraction complete. Check resume_content.txt")
