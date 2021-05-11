export default {
    get_best_score: () => parseInt(localStorage.best_score) || 0,
    set_best_score: (best_score) => localStorage.setItem('best_score', best_score)
}
