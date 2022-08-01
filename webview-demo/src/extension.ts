import {
	ExtensionContext,
	commands,
	window,
	ViewColumn
} from 'vscode';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('show.webview.demo', () => {
			const panel = window.createWebviewPanel(
				'webviewDemo',
				'Webview Demo',
				ViewColumn.One,
				{}
			);

			panel.webview.html = getWebviewContent();
		}),
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getWebviewContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <input type='text' />
</body>
</html>`;
}