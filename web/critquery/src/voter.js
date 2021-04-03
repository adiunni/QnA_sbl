var token = localStorage.getItem("token");

export default class Vote {
    static upvoteQuestion(id) {
        if (!token) return;
        fetch("https://qna-sbl.herokuapp.com/api/q/"+id+"/like",{method: "POST",headers: {'Content-Type': "application/json", Authorization: "Token "+token}});
    }

    static downvoteQuestion(id) {
        if (!token) return;
        fetch("https://qna-sbl.herokuapp.com/api/q/"+id+"/dislike",{method: "POST",headers: {'Content-Type': "application/json", Authorization: "Token "+token}});
    }

    static upvoteAnswer(id) {
        if (!token) return;
        fetch("https://qna-sbl.herokuapp.com/api/a/"+id+"/like",{method: "POST",headers: {'Content-Type': "application/json", Authorization: "Token "+token}});
    }

    static downvoteAnswer(id) {
        if (!token) return;
        fetch("https://qna-sbl.herokuapp.com/api/a/"+id+"/dislike",{method: "POST",headers: {'Content-Type': "application/json", Authorization: "Token "+token}});
    }
}