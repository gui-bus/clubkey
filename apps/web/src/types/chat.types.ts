export interface ChatMessage {
  id: string
  senderId: "user" | number
  text: string
  timestamp: string
  read: boolean
}
