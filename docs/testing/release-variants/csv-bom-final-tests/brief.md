# Requested CSV option

Add an optional UTF-8 BOM to the existing CSV formatter. Preserve existing output by default, all supported input content, escaping, column order, and CRLF separators. Opt-in adds one U+FEFF before the complete header, including empty record lists. The formatter returns text; inspect its UTF-8 encoding separately. No spreadsheet compatibility claim or dependency is requested.

This evaluation selects `testing.placement: end-of-change`. Plan acceptance cases before implementation, give each task a suitable completion check, and group the automated suite in final verification with task-to-test links.
