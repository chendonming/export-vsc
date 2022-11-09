import * as vscode from 'vscode';

type mapValue = {
  // 匹配到的行首index
  index: number,
  // 匹配到的index
  matchIndex: number
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('export-transform.transform', () => {
    const activeEditor = vscode.window.activeTextEditor
    if (activeEditor) {
      const document = activeEditor.document
      const regex = /export\s+(?:function|const|let|class)\s+([\$\w]+)/g
      const map = new Map<string, mapValue>()
      if (['javascript', 'typescript'].includes(document.languageId)) {
        const text = document.getText()
        for (let match of text.matchAll(regex)) {
          if (match.index) {
            map.set(match[1], { index: match.index, matchIndex: match.index + match[0].indexOf(match[1]) })
          }
        }

        activeEditor.edit(editor => {
          map.forEach(row => {
            const position = document.positionAt(row.index)
            const range = document.getWordRangeAtPosition(position)
            if (range) {
              editor.delete(range)
            }
          })

          let line = document.lineCount
          let range = document.lineAt(line - 1).range
          const content = document.getText(range)
          // 没有空行则新创建一条新行
          if (content) {
            editor.insert(range.end, '\n')
          }

          let str = '';
          map.forEach((_, key) => {
            str += `${key},`
          })

          let newrange = document.lineAt(document.lineCount - 1).range
          editor.insert(newrange.end, `export {${str}}`)
        })
      }
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
