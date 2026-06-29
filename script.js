const URL = "./model/";

let model;

async function loadModel() {
    model = await tmImage.load(
        URL + "model.json",
        URL + "metadata.json"
    );
}

loadModel();

document.getElementById("imageUpload").addEventListener("change", async function(e){

    const image = document.createElement("img");
    image.src = URL.createObjectURL(e.target.files[0]);

    image.onload = async function(){

        const prediction = await model.predict(image);

        prediction.sort((a,b)=>b.probability-a.probability);

        document.getElementById("result").innerHTML =
        prediction[0].className +
        " (" +
        (prediction[0].probability*100).toFixed(2) +
        "%)";
    }

});
