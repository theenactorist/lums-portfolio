"""Generate the searchable PDF and standalone print view from app/data/resume.json.
Run with Python 3 and reportlab installed; the website reads the same JSON.
"""
from pathlib import Path
import json
import hashlib
from html import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak

root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'app/data/resume.json').read_text())
public = root / 'public'
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=23, leading=28, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='Helvetica', fontSize=12, leading=17, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9, leading=12, textColor=colors.HexColor('#444444')),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=11, leading=15, spaceBefore=13, spaceAfter=7, keepWithNext=True),
    'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=11.5, leading=15, spaceBefore=8, spaceAfter=3, keepWithNext=True),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=10, leading=13.5, spaceAfter=4, keepWithNext=True, textColor=colors.HexColor('#444444')),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10.5, leading=13.5, spaceAfter=5),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10.5, leading=13.5, leftIndent=11, firstLineIndent=-9, spaceAfter=4),
}

def para(text, style='body'):
    return Paragraph(escape(text), styles[style])

story = [para(data['name'], 'name'), para(data['title'], 'title'),
         para(data['location'] + ' | ' + data['phone'] + ' | ' + data['email'], 'contact'),
         para(data['website'] + ' | ' + data['linkedin'], 'contact'),
         para('Professional summary', 'section'), para(data['summary']),
         para('Core skills', 'section')]
for skill in data['skills']:
    story.append(Paragraph('<b>' + escape(skill['label']) + ':</b> ' + escape(skill['text']), styles['body']))
story.append(para('Work experience', 'section'))
for index, job in enumerate(data['experience']):
    story.append(KeepTogether([para(job['company'], 'job'), para(job['role'] + ' | ' + job['period'], 'role'), para(job['summary'])]))
    for bullet in job['bullets']:
        story.append(Paragraph('&#8226; ' + escape(bullet), styles['bullet']))
story.append(para('Selected project', 'section'))
for project in data['projects']:
    story.append(KeepTogether([para(project['company'] + ' | ' + project['role'] + ' | ' + project['period'], 'job'), para(project['text'])]))
for label, key in [('Education','education'), ('Certification','certifications'), ('Volunteer experience','volunteering')]:
    story.append(para(label, 'section'))
    for item in data[key]:
        story.append(KeepTogether([Paragraph('<b>' + escape(item['title']) + '</b> | ' + escape(item['period']),styles['body']), para(item['institution'] + ('. ' + item['text'] if item.get('text') else ''))]))

def footer(canvas, doc):
    canvas.setTitle(data['name'] + ' - Resume')
    canvas.setAuthor(data['name'])
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#666666'))
    canvas.drawString(42, 26, data['name'])
    canvas.drawRightString(letter[0]-42, 26, str(doc.page))

pdf = public / 'olumide-olusesi-resume.pdf'
SimpleDocTemplate(str(pdf), pagesize=letter, rightMargin=42, leftMargin=42, topMargin=37, bottomMargin=40, title=data['name']+' - Resume', author=data['name']).build(story,onFirstPage=footer,onLaterPages=footer)

h = ['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Résumé: Senior Product Designer | Lums</title><style>body{max-width:850px;margin:48px auto;padding:0 28px;font:15px/1.6 Arial,sans-serif;color:#111}h1{font-size:32px;margin:0}h2{font-size:16px;margin:30px 0 12px;border-top:1px solid #ddd;padding-top:16px}h3{font-size:16px;margin:24px 0 0}p{margin:7px 0}a{color:inherit}li{margin:6px 0}.contact{font-size:13px;color:#444}.role{color:#555}button{font:inherit;padding:10px 18px;margin-bottom:24px}@media print{body{margin:0;padding:0;font-size:10.5pt}button{display:none}h2,h3{break-after:avoid}li{break-inside:avoid}}@page{size:letter;margin:16mm}</style>',
     '<h1>'+escape(data['name'])+'</h1><p>'+escape(data['title'])+'</p>',
     '<p class="contact">'+escape(' | '.join(data[k] for k in ['location','phone','email','website','linkedin']))+'</p>',
     '<h2>Professional summary</h2><p>'+escape(data['summary'])+'</p><h2>Core skills</h2>']
for skill in data['skills']:h.append('<p><b>'+escape(skill['label'])+':</b> '+escape(skill['text'])+'</p>')
h.append('<h2>Work experience</h2>')
for job in data['experience']:
    h.extend(['<section><h3>'+escape(job['company'])+'</h3><p class="role">'+escape(job['role']+' | '+job['period'])+'</p><p>'+escape(job['summary'])+'</p><ul>'])
    h.extend('<li>'+escape(b)+'</li>' for b in job['bullets']);h.append('</ul></section>')
h.append('<h2>Selected project</h2>')
for project in data['projects']:h.append('<h3>'+escape(project['company'])+'</h3><p>'+escape(project['role']+' | '+project['period'])+'</p><p>'+escape(project['text'])+'</p>')
for label,key in [('Education','education'),('Certification','certifications'),('Volunteer experience','volunteering')]:
    h.append('<h2>'+label+'</h2>')
    for item in data[key]:h.append('<h3>'+escape(item['title'])+'</h3><p>'+escape(item['institution']+' | '+item['period'])+'</p>' + ('<p>'+escape(item['text'])+'</p>' if item.get('text') else ''))
h.append('</html>');(public/'olumide-olusesi-resume.html').write_text('\n'.join(h))
print('Generated',pdf,'and matching print HTML')

manifest = {name: hashlib.sha256((root / name).read_bytes()).hexdigest() for name in ['app/data/resume.json', 'public/olumide-olusesi-resume.pdf', 'public/olumide-olusesi-resume.html']}
(root / 'app/data/resume-artifacts.json').write_text(json.dumps(manifest, indent=2) + '\n')
