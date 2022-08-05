package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	sampleString := `{"id":"cmpl-5bokMHuH6uQ0agykZzr2hUeNKn1S8","object":"text_completion","created": 1659694890,"model":"davinci:ft-playpower-labs:2022-07-18-11-10-20-2022-07-18-05-44-00","choices":[{"text":"Are there any objective standards of Truth? \n Socrates. There are indeed, and in this and in many other instances, we ought to be guided by them. In the first place, I certainly thought that the nature of the human soul was known to all of us, and I do not know why I am talking of the nature of the soul, as if it were a thing unknown to you, instead of recalling to mind that you are familiar with the subject. You know that the soul is by nature the divinest of things known to us, and that the body is the most soulless. I am speaking of the soul which is commonly supposed to be seated in the head, and is the power of thought and reason in us, which we say is the peculiar property of man, and which is imparted from God, and is the mightiest of divine things in man. I am speaking of this, and wondering whether this is the soul which is the cause of our doing wrong, and which, as we say, is induced by the body; or whether the soul which is the cause of evil to us, is distinct from this, and is to be sought for among the passions which are the followers of pleasure, and are therefore reckoned evil. For example, I see that you are inclined to laugh, and this may be the evil of which we are speaking. Theaetetus. Yes, indeed; and I feel that there is a strange confusion in my mind, and I should very much like to hear what you think","index": 0,"logprobs": null,"finish_reason":"length"}],"usage":{"prompt_tokens": 12,"completion_tokens": 300,"total_tokens": 312}}`

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, sampleString)
	})

	log.Println("Listening on localhost:8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
