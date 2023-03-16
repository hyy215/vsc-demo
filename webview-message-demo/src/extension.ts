import * as vscode from 'vscode';

export class Webview implements vscode.WebviewViewProvider {
	private _webview: vscode.Webview | undefined;

	resolveWebviewView(
		webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext<unknown>, 
		token: vscode.CancellationToken
	): void | Thenable<void> {
		this._webview = webviewView.webview;
		webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            enableCommandUris: true,
        };

		webviewView.webview.html = this.getHtmlContent();
		webviewView.webview.onDidReceiveMessage(event => {
			vscode.window.showInformationMessage('Received messages from webview.');
		});
	}

	sendMessage() {
		this._webview?.postMessage({
			data: 'Send Mesasge To Webview'
		});
	}

	getHtmlContent() {
		return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Webview Demo</title>
	</head>
	<body>
		<div id="root">
			<h2 id="message"></h2>
			<button onclick="sendMessage()">Send Message To Host</button>
		</div>
	</body>
	<script>
		window.addEventListener('message', event => {
			document.getElementById("message").textContent = 'Received message from host';
		});

		const vscode = acquireVsCodeApi();
		function sendMessage() { 	 	
			vscode.postMessage({data: 'Send Message To Host'});	
		}
	</script>
</html>`;
	}
}

export function activate(context: vscode.ExtensionContext) {
	const webview = new Webview();
	vscode.window.registerWebviewViewProvider('activitybar.webview-message-demo', webview, {
		webviewOptions: {
			retainContextWhenHidden: true,
		},
	});

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'show.webview.message.demo', 
			() => vscode.commands.executeCommand('workbench.view.extension.webview-demo-activitybar')
		),
		vscode.commands.registerCommand(
			'send.message.to.webview', 
			() => webview.sendMessage()
		)
	);
}

export function deactivate() {}
