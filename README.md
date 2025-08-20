# Easy Memo For Mac

シンプルで使いやすいMac専用メモアプリです。

<img width="449" height="595" alt="memo" src="https://github.com/user-attachments/assets/4896064e-37f2-4e38-9118-e93ddd1bcc38" />


## 特徴

- **インテリジェントなリスト入力** - `・`でリスト作成、Tabでインデント、改行で自動継続
- **階層構造サポート** - ネストしたリストで情報を整理
- **直感的なキーボード操作** - Tab/Shift+Tabでインデント調整
- **軽量で高速** - 起動が早く、動作がスムーズ

## インストール

### 要件
- macOS 11.0 以降
- Apple Silicon (arm64) 対応

### ダウンロード
1. [最新リリース](https://github.com/kandalog/easy-memo-for-mac/releases)から `.dmg` ファイルをダウンロード
2. DMGファイルをマウントしてアプリケーションフォルダにドラッグ
3. 初回起動時は右クリック→「開く」で起動

## 使い方

### リスト機能
Easy Memo の最大の特徴は、直感的なリスト入力機能です：

#### 基本的なリスト作成
1. `・`（中点）を入力してリスト項目を開始
2. 内容を入力して `Enter` - 次の行に自動で `・` が表示
3. 空の `・` の状態で `Enter` - リストモードを終了

#### インデント操作
- **Tab**: インデントを追加（階層を深くする）
- **Shift + Tab**: インデントを削除（階層を浅くする）
- インデントされた状態で改行すると、同じレベルのインデントが維持されます

#### 使用例
```
・ プロジェクト管理
    ・ タスク一覧
        ・ デザイン作成
        ・ 実装
    ・ 進捗確認
・ 買い物リスト
    ・ 食材
    ・ 日用品
```



### ショートカットキー
| キー | 機能 |
|-----|------|
| `Cmd + W` | メモを閉じる |
| `Cmd + Shift + M` | メモの表示/非表示 |
| `Tab` | インデントを追加 |
| `Shift + Tab` | インデントを削除 |

## 開発について

### 技術スタック
- **言語**: TypeScript
- **フレームワーク**: Electron
- **対応OS**: macOS

### ローカル開発
```bash
# リポジトリをクローン
git clone https://github.com/kandalog/easy-memo-for-mac.git

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start
```

### パッケージ作成
```bash
# macOS用の配布パッケージを作成
npm run package
```

## よくある質問

**Q: データはどこに保存されますか？**
A: アプリケーション内のローカルストレージに保存されます。

**Q: 他のMacと同期できますか？**
A: 現在は非対応です。

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 貢献

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 作者

[@kandalog](https://github.com/kandalog)

## サポート

バグ報告や機能要望は [Issues](https://github.com/kandalog/easy-memo-for-mac/issues) までお願いします。

---

⭐ このプロジェクトが気に入ったらスターをお願いします！
