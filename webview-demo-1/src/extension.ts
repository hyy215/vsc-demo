import * as vscode from 'vscode';

export class Webview implements vscode.WebviewViewProvider {
	resolveWebviewView(
		webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext<unknown>, 
		token: vscode.CancellationToken
	): void | Thenable<void> {
		webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            enableCommandUris: true,
        };

		webviewView.webview.html = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Webview Demo</title>
	</head>
	<body>
		<div id="root">
			Webview Demo
		</div>
	</body>
</html>`;
	}
}

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerWebviewViewProvider('activitybar.webview-demo', new Webview(), {
		webviewOptions: {
			retainContextWhenHidden: true,
		},
	});

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'open.webview-demo', 
			() => vscode.commands.executeCommand('workbench.view.extension.webview-demo-activitybar')
		)
	)
}

export function deactivate() {}
