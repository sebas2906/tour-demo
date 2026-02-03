export type Quiz = {
  word: string
  prompt: string
  choices: string[]
  answerIndex: number
  example: string
}

export type Hotspot = {
  id: string
  label: string
  yaw: number
  pitch: number
  tourismTitle: string
  tourismText: string
  quiz: Quiz
}
