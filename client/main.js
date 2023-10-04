var imageFile = {}
const urlBox = document.querySelector(".dialog-box")

function openFileInput() {
  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = "image/*"
  fileInput.style.display = "none"
  document.body.appendChild(fileInput)
  fileInput.click()

  fileInput.addEventListener("change", () => {
    urlBox.style.display = "none"
    const fileInputName = document.querySelector(".image-upload-input")
    fileInputName.value = fileInput.value.split("\\").pop()
    handlePreviewOfImage(fileInput)
    document.body.removeChild(fileInput)
  })
}

function handlePreviewOfImage(fileInput) {
  previewImage = document.querySelector(".preview-image")
  imagePreview = document.querySelector(".image-preview")
  file = fileInput.files[0]
  imageFile = file

  if (file) {
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      imagePreview.src = URL.createObjectURL(file)
      previewImage.style.display = "block"
    }
    fileReader.readAsArrayBuffer(file)
  } else {
    previewImage.style.display = "none"
  }
}

function handleImageUpload() {
  const imageData = new FormData()
  imageData.append("file", imageFile)

  fetch("https://image-store-service.onrender.com/image/upload", {
    method: "POST",
    body: imageData
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (!data?.error) {
        handleShowcaseOfUrl(data?.url)
      } else {
        handleShowcaseError(data?.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleShowcaseOfUrl(url) {
  const urlP = document.querySelector(".dialog-box-text")
  const icon1 = document.querySelector(".correct-icon")
  const icon2 = document.querySelector(".wrong-icon")
  urlBox.style.display = "block"
  icon2.style.display = "none"
  icon1.style.display = "block"
  urlP.textContent = url
}

function handleShowcaseError(message) {
  const urlP = document.querySelector(".dialog-box-text")
  const icon1 = document.querySelector(".correct-icon")
  const icon2 = document.querySelector(".wrong-icon")
  urlBox.style.display = "block"
  icon1.style.display = "none"
  icon2.style.display = "block"
  urlBox.style.display = "block"
  urlP.textContent = message
}

function handleCloseDBox() {
  urlBox.style.display = "none"
}
