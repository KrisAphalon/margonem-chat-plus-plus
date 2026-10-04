export const messageQueue: string[] = [];

let noAnswerTimeout: ReturnType<typeof setTimeout>;

export function startNoAnswerTimeout(ms: number) {
  clearTimeout(noAnswerTimeout);
  noAnswerTimeout = setTimeout(handleNoAnswer, ms);
}

export function clearNoAnswerTimeout() {
  clearTimeout(noAnswerTimeout);
}

function handleNoAnswer() {
  if (messageQueue.length === 0) {
    return;
  }

  if (!sessionStorage["noAnwserMsgDisplayed"]) {
    message(
      "Coś poszło nie tak i twoja wiadomość nie została wysłana na chat.\nMożesz przywrócić ją klikając w białą strzałkę niedaleko pola do wpisywania wiadomości.\nJeżeli wiadomość widnieje na chacie, zignoruj ten komunikat.",
    );
    sessionStorage["noAnwserMsgDisplayed"] = true;
  }
}
