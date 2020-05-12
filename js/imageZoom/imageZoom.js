const imageZoom_template = document.querySelector("#imageZoom").content;

function createZoomImage(image_node,title = image_node.getAttribute('alt')){
    const zoom_popup = imageZoom_template.cloneNode(true);

    zoom_popup.querySelector('.image-zoom__btn_type-exit').addEventListener('click',deleteImageZoom);
    zoom_popup.querySelector('.image-zoom__title').textContent = title;
    zoom_popup.querySelector('.image-zoom__image').setAttribute('src',image_node.getAttribute('src'));
    zoom_popup.querySelector('.image-zoom__image').setAttribute('alt',image_node.getAttribute('alt'));
    
    page.append(zoom_popup);
}

function deleteImageZoom(e) {
    e.preventDefault();
    if (e.target.classList.contains('image-zoom__btn_type-exit')) {
        document.querySelector('.image-zoom').remove();
    }
}