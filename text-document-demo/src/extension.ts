import * as vscode from 'vscode';

const customProvider = new (class implements vscode.TextDocumentContentProvider {
	provideTextDocumentContent(uri: vscode.Uri): string | undefined {
		if(uri.scheme === 'custom') {
			return '';
		}
		return;
	}
})();

export function activate(context: vscode.ExtensionContext) {	
	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider('custom', customProvider),
	);

	context.subscriptions.push(vscode.commands.registerCommand('show.customTextDocument', async () => {
		const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse('custom://demo'));
		await vscode.window.showTextDocument(doc, { preview: false });
	}));
}

export function deactivate() {}
