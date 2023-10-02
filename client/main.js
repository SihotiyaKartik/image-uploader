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

  if (file) {
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      imagePreview.src = e.target.result
      previewImage.style.display = "block"
    }
    fileReader.readAsDataURL(file)
  } else {
    previewImage.style.display = "none"
  }
}
