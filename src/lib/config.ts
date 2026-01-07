export interface Letter {
  content: string
  author: string
}

export interface RecipientConfig {
  name: string
  password: string
  sheetUrl?: string
  letters?: Letter[]
}

export const recipients: Record<string, RecipientConfig> = {
  // 예시: /member1 으로 접근
  member1: {
    name: "원표",
    password: process.env.NEXT_PUBLIC_PASSWORD_MEMBER1 || "onside1234",
    sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL_MEMBER1,
  },
  // 예시: /member2 로 접근
  member2: {
    name: "정원이",
    password: process.env.NEXT_PUBLIC_PASSWORD_MEMBER2 || "onside5678",
    sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL_MEMBER2,
  },
}
