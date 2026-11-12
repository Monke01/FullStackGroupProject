# -*- coding: utf-8 -*-
"""
QuizForge Full-Stack Project Report Assembler
Updates 'Full stack _SAMPLE PROJECT REPORT.docx' starting strictly from ABSTRACT (element 113).
Preserves elements 0-112 (Cover Page, Declaration, Bonafide Certificate).
Preserves final sectPr.
"""

import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

import report_data
import report_chapters
import report_sprints
import report_end

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_background(cell, color_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_table_borders(table, color="D0D5DD", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def format_run(run, font_name="Times New Roman", size_pt=12, bold=False, italic=False, color_rgb=(0, 0, 0)):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = RGBColor(*color_rgb)

def add_p(doc, text="", font_name="Times New Roman", size_pt=12, bold=False, italic=False, 
          align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.5):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    if text:
        run = p.add_run(text)
        format_run(run, font_name, size_pt, bold, italic)
    return p

def add_major_title(doc, text):
    return add_p(doc, text, size_pt=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=18, space_after=12)

def add_h1(doc, text):
    return add_p(doc, text, size_pt=14, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=14, space_after=6)

def add_h2(doc, text):
    return add_p(doc, text, size_pt=13, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=10, space_after=4)

def add_h3(doc, text):
    return add_p(doc, text, size_pt=12, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=8, space_after=3)

def add_h4(doc, text):
    return add_p(doc, text, size_pt=12, bold=True, italic=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=6, space_after=2)

def add_code(doc, code_str):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(code_str)
    format_run(run, font_name="Consolas", size_pt=9.5, bold=False, italic=False, color_rgb=(15, 23, 42))
    pPr = p._p.get_or_add_pPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="F8FAFC"/>')
    pPr.append(shd)
    return p

def add_table(doc, headers, data, col_widths=None):
    table = doc.add_table(rows=len(data) + 1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table)

    # Header Row
    hdr_cells = table.rows[0].cells
    for i, title in enumerate(headers):
        hdr_cells[i].text = title
        set_cell_background(hdr_cells[i], "1E293B")
        set_cell_margins(hdr_cells[i], top=100, bottom=100, left=120, right=120)
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for run in p.runs:
            format_run(run, font_name="Times New Roman", size_pt=10, bold=True, color_rgb=(255, 255, 255))

    # Data Rows
    for r_idx, row_data in enumerate(data):
        row_cells = table.rows[r_idx + 1].cells
        bg_color = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_data):
            row_cells[c_idx].text = str(val)
            set_cell_background(row_cells[c_idx], bg_color)
            set_cell_margins(row_cells[c_idx], top=70, bottom=70, left=100, right=100)
            p = row_cells[c_idx].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT if c_idx > 0 and len(str(val)) > 15 else WD_ALIGN_PARAGRAPH.CENTER
            for run in p.runs:
                format_run(run, font_name="Times New Roman", size_pt=9.5, bold=False, color_rgb=(15, 23, 42))

    if col_widths:
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = Inches(width)

    add_p(doc, "", space_after=4)
    return table

def render_section_blocks(doc, text_block):
    """Parses text containing headers and paragraphs and adds them cleanly."""
    lines = text_block.strip().split("\n\n")
    for block in lines:
        block = block.strip()
        if not block:
            continue
        # Check if block starts with section number e.g. "2.1.2 Functional Document"
        first_line = block.split("\n")[0].strip()
        if first_line.startswith(("2.1.", "2.2.", "2.3.", "1.", "3.", "4.")):
            # Has a header on the first line
            rest = "\n".join(block.split("\n")[1:]).strip()
            # Determine depth
            prefix = first_line.split(" ")[0]
            dots = prefix.count(".")
            if dots == 1:
                add_h1(doc, first_line)
            elif dots == 2:
                add_h2(doc, first_line)
            elif dots >= 3:
                add_h3(doc, first_line)
            else:
                add_h1(doc, first_line)
            
            if rest:
                # Could have bullet points or sub-paragraphs
                for sub in rest.split("\n"):
                    sub = sub.strip()
                    if sub:
                        if sub.startswith("- "):
                            add_p(doc, sub, space_before=2, space_after=2)
                        else:
                            add_p(doc, sub)
        else:
            # Regular paragraph or multi-line text
            for line in block.split("\n"):
                line = line.strip()
                if line:
                    if line.startswith("- ") or line.startswith("• "):
                        add_p(doc, line, space_before=2, space_after=2)
                    elif line.startswith(("1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.")):
                        add_p(doc, line, space_before=3, space_after=3)
                    elif line.startswith(("Day 1:", "Day 2:", "Day 3:", "Day 4:", "Day 5:")):
                        # Standup log item
                        p = add_p(doc, "", space_before=3, space_after=3)
                        r1 = p.add_run(line.split(":")[0] + ": ")
                        format_run(r1, bold=True)
                        r2 = p.add_run(":".join(line.split(":")[1:]).strip())
                        format_run(r2, bold=False)
                    else:
                        add_p(doc, line)

def build_report():
    input_doc_path = "Full stack _SAMPLE PROJECT REPORT.docx"
    output_doc_path = "Full stack _SAMPLE PROJECT REPORT.docx"
    backup_doc_path = "QuizForge_Full_Stack_Project_Report.docx"

    print("Opening template document:", input_doc_path)
    doc = Document(input_doc_path)
    body = doc._body._element

    print("Initial elements count:", len(body))
    # Keep 0 through 112 untouched. Remove elements 113 to len(body)-1.
    del body[113:-1]
    print("After clearing old sample content, elements count:", len(body))

    # ==========================================
    # 1. ABSTRACT
    # ==========================================
    print("Adding ABSTRACT...")
    add_major_title(doc, "ABSTRACT")
    add_p(doc, report_data.ABSTRACT_TEXT, space_after=12)
    doc.add_page_break()

    # ==========================================
    # 2. TABLE OF CONTENTS
    # ==========================================
    print("Adding TABLE OF CONTENTS...")
    add_major_title(doc, "TABLE OF CONTENTS")
    toc_headers = ["CHAPTER NO.", "TITLE", "PAGE NO."]
    toc_rows = []
    for item in report_data.TABLE_OF_CONTENTS_DATA:
        title, page = item
        # Split chapter number if present
        title_stripped = title.strip()
        num = ""
        txt = title_stripped
        if title_stripped.startswith(("1.", "2.", "3.", "4.", "A.", "B.", "C.")):
            parts = title_stripped.split(" ", 1)
            num = parts[0]
            txt = parts[1] if len(parts) > 1 else ""
        elif title.startswith("   "):
            # Sub-heading
            parts = title_stripped.split(" ", 1)
            num = "   " + parts[0]
            txt = parts[1] if len(parts) > 1 else ""
        toc_rows.append([num, txt, page])

    add_table(doc, toc_headers, toc_rows, col_widths=[1.4, 4.3, 0.8])
    doc.add_page_break()

    # ==========================================
    # 3. LIST OF FIGURES
    # ==========================================
    print("Adding LIST OF FIGURES...")
    add_major_title(doc, "LIST OF FIGURES")
    fig_headers = ["FIGURE NO.", "TITLE", "PAGE NO."]
    add_table(doc, fig_headers, report_data.LIST_OF_FIGURES_DATA, col_widths=[1.4, 4.3, 0.8])
    doc.add_page_break()

    # ==========================================
    # 4. LIST OF TABLES
    # ==========================================
    print("Adding LIST OF TABLES...")
    add_major_title(doc, "LIST OF TABLES")
    tbl_headers = ["TABLE NO.", "TITLE", "PAGE NO."]
    add_table(doc, tbl_headers, report_data.LIST_OF_TABLES_DATA, col_widths=[1.4, 4.3, 0.8])
    doc.add_page_break()

    # ==========================================
    # 5. ABBREVIATIONS
    # ==========================================
    print("Adding ABBREVIATIONS...")
    add_major_title(doc, "LIST OF ABBREVIATIONS")
    abbr_headers = ["ABBREVIATION", "EXPANSION"]
    add_table(doc, abbr_headers, report_data.ABBREVIATIONS_DATA, col_widths=[1.8, 4.7])
    doc.add_page_break()

    # ==========================================
    # 6. CHAPTER 1: INTRODUCTION
    # ==========================================
    print("Adding CHAPTER 1: INTRODUCTION...")
    ch1 = report_chapters.CHAPTER_1_CONTENT
    add_major_title(doc, ch1["title"])
    
    add_h1(doc, ch1["intro_heading"])
    add_p(doc, ch1["intro_p1"])
    add_p(doc, ch1["intro_p2"])

    add_h1(doc, ch1["motivation_heading"])
    add_p(doc, ch1["motivation_p1"])
    add_p(doc, ch1["motivation_p2"])

    add_h1(doc, ch1["problem_heading"])
    add_p(doc, ch1["problem_p1"])
    add_p(doc, ch1["problem_p2"])

    add_h1(doc, ch1["sdg_heading"])
    add_p(doc, ch1["sdg_p1"])
    add_p(doc, ch1["sdg_p2"])

    add_h1(doc, ch1["vision_heading"])
    add_p(doc, ch1["vision_audience"])
    add_p(doc, ch1["vision_needs"])
    add_p(doc, ch1["vision_products"])
    add_p(doc, ch1["vision_values"])

    add_h1(doc, ch1["goal_heading"])
    add_p(doc, ch1["goal_p1"])

    add_h1(doc, "1.7 Product Backlog (Key User Stories with Desired Outcomes)")
    add_p(doc, "The comprehensive product backlog for QuizForge defines all functional and non-functional requirements prioritized using the MoSCoW framework. Table 1.1 enumerates the complete user stories.")
    add_p(doc, "Table 1.1: Comprehensive Product Backlog of QuizForge Application", size_pt=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_table(doc, ["US ID", "Story Title", "User Story Description", "Priority", "Type", "Acceptance Criteria"], 
              report_chapters.PRODUCT_BACKLOG_TABLE, col_widths=[0.8, 1.2, 2.3, 0.8, 0.8, 1.6])

    add_h1(doc, "1.8 Product Release Plan")
    add_p(doc, "The release plan establishes a three-phase iterative delivery roadmap aligned with academic evaluation deadlines. Table 1.2 specifies milestones, allocated sprints, key deliverables, and target completion schedules.")
    add_p(doc, "Table 1.2: Release Roadmap and Milestone Deliverables Schedule", size_pt=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_table(doc, report_chapters.RELEASE_PLAN_TABLE[0], report_chapters.RELEASE_PLAN_TABLE[1:], col_widths=[1.4, 0.8, 2.7, 1.0, 0.8])
    doc.add_page_break()

    # ==========================================
    # 7. CHAPTER 2: SPRINT PLANNING AND EXECUTION
    # ==========================================
    print("Adding CHAPTER 2: SPRINT PLANNING AND EXECUTION...")
    add_major_title(doc, "CHAPTER 2\nSPRINT PLANNING AND EXECUTION")

    # Helper for rendering each sprint
    def render_sprint(s_data, sprint_num, tbl_stories_num, tbl_tc_num):
        add_h1(doc, s_data["title"])
        
        # 2.x.1 Sprint Goal & User Stories
        render_section_blocks(doc, s_data["goal"])
        add_p(doc, f"Table 2.{tbl_stories_num}: Detailed User Stories for Sprint {sprintnum_clean}", size_pt=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
        add_table(doc, ["US ID", "User Story Title", "Detailed Description", "Priority", "Status"], 
                  s_data["user_stories"], col_widths=[0.8, 1.5, 2.7, 0.8, 0.9])

        # 2.x.2 Functional Document
        render_section_blocks(doc, s_data["functional"])

        # 2.x.3 Architecture Document
        render_section_blocks(doc, s_data["architecture"])

        # 2.x.4 UI Design
        render_section_blocks(doc, s_data["ui_design"])

        # 2.x.5 Functional Test Cases
        add_h2(doc, f"2.{sprint_num}.5 Functional Test Cases")
        add_p(doc, f"Table 2.{tbl_tc_num}: Functional Test Cases for Sprint {sprintnum_clean}", size_pt=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
        add_table(doc, ["Test ID", "Test Scenario", "Input / Action", "Expected Result", "Actual Result", "Status"], 
                  s_data["test_cases"], col_widths=[0.7, 1.2, 1.5, 1.6, 1.3, 0.6])

        # 2.x.6 Daily Progress
        render_section_blocks(doc, s_data["daily_progress"])

        # 2.x.7 Committed vs Completed
        add_h2(doc, f"2.{sprint_num}.7 Committed vs Completed User Stories")
        add_table(doc, s_data["committed_vs_completed"][0], s_data["committed_vs_completed"][1:], col_widths=[2.8, 1.1, 1.1, 1.5])

        # 2.x.8 Retrospective
        add_h2(doc, f"2.{sprint_num}.8 Sprint Retrospective")
        add_table(doc, s_data["retrospective"][0], [s_data["retrospective"][1]], col_widths=[1.6, 1.6, 1.6, 1.6])
        add_p(doc, "", space_after=12)

    # Sprint 1
    sprintnum_clean = 1
    render_sprint(report_sprints.SPRINT_1_DATA, 1, "1", "3")

    # Sprint 2
    sprintnum_clean = 2
    render_sprint(report_sprints.SPRINT_2_DATA, 2, "4", "5")

    # Sprint 3
    sprintnum_clean = 3
    render_sprint(report_sprints.SPRINT_3_DATA, 3, "6", "7")
    doc.add_page_break()

    # ==========================================
    # 8. CHAPTER 3: RESULTS AND DISCUSSIONS
    # ==========================================
    print("Adding CHAPTER 3: RESULTS AND DISCUSSIONS...")
    ch3 = report_end.CHAPTER_3_CONTENT
    add_major_title(doc, ch3["title"])
    add_h1(doc, ch3["outcomes_heading"])
    add_p(doc, ch3["outcomes_p1"])
    for item in ch3["outcomes_p2"].split("\n"):
        item = item.strip()
        if item:
            add_p(doc, item, space_before=2, space_after=3)

    add_h1(doc, ch3["committed_heading"])
    add_p(doc, ch3["committed_p1"])
    add_p(doc, "Table 3.1: Comprehensive Committed vs Completed User Stories Across All Sprints", size_pt=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_table(doc, ch3["table_3_1"][0], ch3["table_3_1"][1:], col_widths=[0.9, 0.7, 2.0, 0.6, 0.8, 1.7])
    doc.add_page_break()

    # ==========================================
    # 9. CHAPTER 4: CONCLUSIONS & FUTURE ENHANCEMENTS
    # ==========================================
    print("Adding CHAPTER 4: CONCLUSIONS & FUTURE ENHANCEMENTS...")
    ch4 = report_end.CHAPTER_4_CONTENT
    add_major_title(doc, ch4["title"])
    add_h1(doc, ch4["conclusion_heading"])
    add_p(doc, ch4["conclusion_p1"])
    add_p(doc, ch4["conclusion_p2"])

    add_h1(doc, ch4["enhancements_heading"])
    for item in ch4["enhancements_p1"].split("\n"):
        item = item.strip()
        if item:
            add_p(doc, item, space_before=2, space_after=3)
    doc.add_page_break()

    # ==========================================
    # 10. APPENDIX
    # ==========================================
    print("Adding APPENDIX...")
    app = report_end.APPENDIX_CONTENT
    add_major_title(doc, app["title"])

    # Patent Form
    add_h1(doc, app["patent_heading"])
    add_h2(doc, app["patent_title"])
    for block in app["patent_body"].split("\n\n"):
        block = block.strip()
        if block:
            render_section_blocks(doc, block)
    doc.add_page_break()

    # Sample Coding
    add_h1(doc, app["sample_code_heading"])
    add_p(doc, app["sample_code_intro"])
    add_h2(doc, app["sample_code_1_title"])
    add_code(doc, app["sample_code_1"])
    add_h2(doc, app["sample_code_2_title"])
    add_code(doc, app["sample_code_2"])
    doc.add_page_break()

    # Plagiarism Report
    add_h1(doc, app["plagiarism_heading"])
    for block in app["plagiarism_body"].split("\n\n"):
        block = block.strip()
        if block:
            render_section_blocks(doc, block)

    print("Saving document to:", output_doc_path)
    doc.save(output_doc_path)
    print("Saving copy to:", backup_doc_path)
    doc.save(backup_doc_path)
    print("SUCCESS: Full report assembled successfully!")

if __name__ == "__main__":
    build_report()
