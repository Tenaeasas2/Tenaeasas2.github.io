const WebSocket = require('ws');
const fs = require('fs');
const CHAT_LOG_FILE = './chat_log.json';
const wss = new WebSocket.Server({ port: 3000 });

let users = [];
let messages = [];

// 读取已有聊天记录
if (fs.existsSync(CHAT_LOG_FILE)) {
  try {
    const data = fs.readFileSync(CHAT_LOG_FILE, 'utf8');
    messages = JSON.parse(data);
  } catch (err) {
    console.error('读取聊天记录文件失败:', err);
  }
}

const generateRandomName = () => {
  const adjectives = ['快乐的', '聪明的', '勇敢的', '可爱的', '神秘的'];
  const nouns = ['熊猫', '兔子', '猫咪', '狗狗', '小鸟'];
  return adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
};

const checkUserActivity = () => {
  const now = Date.now();
  users = users.map(user => {
    return {
      ...user,
      status: now - user.lastActive < 300000 ? 'online' : 'offline',
      lastActive: user.status === 'online' ? user.lastActive : now
    }
  });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'users', payload: users }));
    }
  });
};

setInterval(checkUserActivity, 10000);

wss.on('connection', function connection (ws) {
  const userId = Date.now();
  const username = generateRandomName();
  const existingUser = users.find(user => user.id === userId);
  if (existingUser) {
    existingUser.status = 'online';
    existingUser.lastActive = Date.now();
  } else {
    users.push({
      id: userId,
      name: username,
      lastActive: Date.now(),
      status: 'online'
    });
  }

  ws.on('message', function message (data) {
    const parsed = JSON.parse(data);
    if (parsed.type === 'message') {
      users = users.map(user => user.id === ws.id ? { ...user, lastActive: Date.now() } : user);
      messages.push(parsed.payload);
      // 更新聊天记录文件
      fs.writeFileSync(CHAT_LOG_FILE, JSON.stringify(messages), 'utf8');
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', payload: parsed.payload }));
        }
      });
    } else if (parsed.type === 'join') {
      users = users.map(user => user.id === ws.id ? { ...user, lastActive: Date.now() } : user);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'users', payload: users }));
        }
      });
    } else if (parsed.type === 'clear_users') {
      users = [];
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'users', payload: users }));
        }
      });
    }
  });

  ws.on('close', function close () {
    users = users.filter(user => user.id !== userId);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'users', payload: users }));
      }
    });
  });

  ws.id = userId;
  ws.send(JSON.stringify({ type: 'users', payload: users }));
  ws.send(JSON.stringify({ type: 'messages', payload: messages }));
});