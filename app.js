const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Slack APIトークン
const SLACK_TOKEN = 'xoxp-7157234464467-7157346749650-7142892442727-f4882cc2366a7d43b19a0b0b440d1649'; // ここにあなたのSlack APIトークンを設定します
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/set-status', async (req, res) => {
    const { statusText, statusEmoji, statusExpiration } = req.body;

    try {
        const response = await axios.post(
            'https://slack.com/api/users.profile.set',
            {
                profile: {
                    status_text: statusText,
                    status_emoji: statusEmoji,
                    status_expiration: statusExpiration,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SLACK_TOKEN}`,
                },
            }
        );

        if (response.data.ok) {
            res.status(200).send('カスタムステータスが正常に設定されました。');
        } else {
            res.status(400).send(`エラーが発生しました: ${response.data.error}`);
        }
    } catch (error) {
        console.error('APIリクエスト中にエラーが発生しました:', error);
        res.status(500).send('APIリクエスト中にエラーが発生しました');
    }
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました`);
});
