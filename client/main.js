var imageFile = {}

function openFileInput() {
  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = "image/*"
  fileInput.style.display = "none"
  document.body.appendChild(fileInput)
  fileInput.click()

  fileInput.addEventListener("change", () => {
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

  fetch("http://localhost:3000/image/upload", {
    method: "POST",
    body: imageData
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
