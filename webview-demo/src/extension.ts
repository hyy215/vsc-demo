import {
	ExtensionContext,
	commands,
	WebviewViewProvider,
	WebviewView,
	WebviewViewResolveContext,
	CancellationToken,
	window
} from 'vscode';

export function activate(context: ExtensionContext) {
	const webview = new WebviewDemo();
	context.subscriptions.push(
		commands.registerCommand('show.webview.demo', () => {
			webview.show();
		}),
		window.registerWebviewViewProvider('webview-demo', webview, {
			webviewOptions: {
				retainContextWhenHidden: true,
			},
		}),
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

export class WebviewDemo implements WebviewViewProvider {
	private _webviewView?: WebviewView;

	async resolveWebviewView(
		webviewView: WebviewView,
		context: WebviewViewResolveContext,
		_token: CancellationToken
	) {
		this._webviewView = webviewView;
		webviewView.webview.html = getWebviewContent();
	}

	show() {
		commands.executeCommand("workbench.view.extension.webview-activitybar");
	}
}

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