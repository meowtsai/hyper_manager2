export const isAddedOptions = {
  0: "未加入",
  1: "已加入",
};

export const vipRankingOptions = [
  {
    value: "revered",
    label: "尊榮R",
    color: "success",
  },
  {
    value: "red",
    label: "紅R",
    color: "danger",
  },
  {
    value: "black",
    label: "黑R",
    color: "dark",
  },
  {
    value: "platinum",
    label: "白金R",
    color: "info",
  },
  {
    value: "gold",
    label: "金R",
    color: "warning",
  },
  {
    value: "silver",
    label: "銀R",
    color: "secondary",
  },
  {
    value: "general",
    label: "普R",
    color: "primary",
  },
  {
    value: "bee",
    label: "準R",
    color: "pink",
  },
];

export const vipServiceOptions = [
  {
    type: 1,
    label: "服務紀錄",
    icon: "mdi mdi-room-service-outline",
    list: {
      "1": "轉職時間限制重置",
      "2": "更名時間限制重置",
      "3": "分解物品救回(裝備/坐騎/材料/友好度)",
      "4": "帳號綁定轉移",
      "5": "盜用恢復",
      "6": "儲值異常查詢",
      "7": "流失關懷",
      "8": "簡訊通知",
      "9": "其他",
    },
  },
  {
    type: 2,
    label: "重點對話節錄",
    icon: "mdi mdi-chat-processing",
    list: { "1": "心聲建議", "2": "Bug 反映", "9": "其他" },
  },
];

export const vipServiceOptionsByGameId = {
  h55naxx2tw: {
    1: {
      "1": "遊戲歷程查詢",
      "2": "懲處查詢",
      "3": "帳號找回",
      "5": "帳號盜用",
      "9": "其他",
    },
    2: {
      "1": "心聲建議",
      "2": "BUG反饋",
      "3": "遊戲問題",
      "4": "活動詢問",
      "5": "帳號相關",
      "6": "抱怨",
      "7": "儲值相關",
      "8": "爆PING問題",
      "9": "其他",
    },
  },
  g66naxx2tw: {
    1: {
      "1": "遊戲資訊詢問",
      "2": "遊戲異常查詢",
      "3": "道具刪除或遺失",
      "5": "帳號盜用",
      "6": "儲值掉單",
      "9": "其他",
    },
    2: {
      "1": "遊戲建議",

      "2": "BUG反饋",
      "3": "改版內容抱怨",
      "4": "遊戲資訊抱怨",
      "5": "機率機率抱怨",
      "6": "活動建議",
      "9": "其他",
    },
  },
  h35naxx1hmt: {
    1: {
      "1": "轉職時間限制重置",
      "2": "更名時間限制重置",
      "3": "分解物品救回(裝備/坐騎/材料/友好度)",
      "4": "帳號綁定轉移",
      "5": "盜用恢復",
      "6": "儲值異常查詢",
      "7": "流失關懷",
      "8": "簡訊通知",
      "9": "其他",
    },
    2: { "1": "心聲建議", "2": "Bug 反映", "9": "其他" },
  },
  L8na: {},
};
