import re, os, shutil

os.chdir('/tmp/dcathedip')

with open('index.html') as f:
    html = f.read()

# Strip frontmatter
if html.startswith('---'):
    html = re.sub(r'^---.*?---\s*', '', html, flags=re.DOTALL)

# Read layout
with open('_layouts/default.html') as f:
    layout = f.read()

# Remove AdSense
layout = re.sub(r'<script.*?adsbygoogle.*?</script>', '', layout, flags=re.DOTALL)

# Substitute
page_title = 'Keep Calm and DCA On | A 6-Step Plan for Canadian ETF Investors'
page_desc = 'A complete plan for Canadian ETF investors: tackle high-interest debt, build a buffer, think about a target (optional), open the right account, pick investments, and automate sustainable contributions. DCA calculator included.'

layout = layout.replace('{{ page.title }}', page_title)
layout = layout.replace('{{ page.description }}', page_desc)
layout = layout.replace("{{ '/assets/css/styles.css' | relative_url }}", '/assets/css/styles.css')
layout = layout.replace('{{ content }}', html)

with open('_site/index.html', 'w') as f:
    f.write(layout)

print('OK', os.path.getsize('_site/index.html'))
