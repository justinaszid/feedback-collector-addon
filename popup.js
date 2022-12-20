const event_name = "your_event_name";
const key = "your_key";

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

document.addEventListener("DOMContentLoaded", function () {
  //Category:
  let category = document.getElementById("category_select");
  category.addEventListener("change", async function () {
    if (category.value === "other") {
      document.getElementById("category_specify").style.display = "block";
      document.getElementById("category_specify").required = true;
    } else {
      document.getElementById("category_specify").style.display = "none";
      document.getElementById("category_specify").required = false;
    }
  });

  let team = document.getElementById("team_select");
  team.addEventListener("change", async function () {
    if (team.value === "other") {
      document.getElementById("team_specify").style.display = "block";
      document.getElementById("team_specify").required = true;
    } else {
      document.getElementById("team_specify").style.display = "none";
      document.getElementById("team_specify").required = false;
    }
  });

  let form = document.getElementById("devx_form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    //gather all needed data:
    let category;
    if (document.getElementById("category_select").value === "other") {
      category = document.getElementById("category_specify").value;
    } else {
      category = document.getElementById("category_select").value;
    }

    let team;
    if (document.getElementById("team_select").value === "other") {
      team = document.getElementById("team_specify").value;
    } else {
      team = document.getElementById("team_select").value;
    }

    let name;
    if (document.getElementById("dev_name").value) {
      name = document.getElementById("dev_name").value;
    } else {
      name = "Name not specified";
    }

    let full_comment = document.getElementById("feedback_comment").value;

    //Trigger email
    let urlToPost = `https://maker.ifttt.com/trigger/${event_name}/with/key/${key}?value1=${encodeURIComponent(
      category
    )}&value2=${encodeURIComponent(
      team + " / " + name
    )}&value3=${encodeURIComponent(full_comment)}`;

    await fetch(urlToPost, {
      method: "POST",
    })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    document.getElementById("thanks").style.display = "block";
    document.getElementById("devx_form").reset();
    document.getElementById("team_specify").style.display = "none";
    document.getElementById("category_specify").style.display = "none";

    //Fade out:
    await delay(2500);
    document.getElementById("thanks").style.display = "none";

    //If add-on was opened from right-click -> close it after sending feedback:
    if (location.hash == "#contextMenu") {
      self.close();
    }
  });
});
