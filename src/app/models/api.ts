// Interface pour la réponse
export interface ApiResponse {
    response_code: number;
    results: QuizQuestion[];
  }
  
  export interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }