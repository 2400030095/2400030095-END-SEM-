// Simple drag-and-drop reorder for the course list
(() => {
  const list = document.getElementById('courseList');
  const orderEl = document.getElementById('currentOrder');

  let dragSrc = null;

  function updateOrderDisplay(){
    // Clear
    orderEl.innerHTML = '';
    Array.from(list.children).forEach(li => {
      const text = li.textContent.trim();
      const item = document.createElement('li');
      item.textContent = text;
      orderEl.appendChild(item);
    });
  }

  function handleDragStart(e){
    dragSrc = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    // store id so drop can validate
    e.dataTransfer.setData('text/plain', this.dataset.id || '');
  }

  function handleDragEnd(){
    this.classList.remove('dragging');
    Array.from(list.children).forEach(item => item.classList.remove('over'));
    updateOrderDisplay();
  }

  function handleDragOver(e){
    e.preventDefault(); // necessary to allow drop
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(){
    if(this !== dragSrc) this.classList.add('over');
  }

  function handleDragLeave(){
    this.classList.remove('over');
  }

  function handleDrop(e){
    e.stopPropagation(); // stops browser from redirecting

    if(dragSrc && dragSrc !== this){
      // determine current indices
      const nodes = Array.from(list.children);
      const srcIdx = nodes.indexOf(dragSrc);
      const dstIdx = nodes.indexOf(this);

      // Insert before or after depending on positions
      if(srcIdx < dstIdx){
        list.insertBefore(dragSrc, this.nextSibling);
      } else {
        list.insertBefore(dragSrc, this);
      }
    }

    return false;
  }

  // Attach listeners
  Array.from(list.children).forEach(li => {
    li.addEventListener('dragstart', handleDragStart, false);
    li.addEventListener('dragend', handleDragEnd, false);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('dragenter', handleDragEnter, false);
    li.addEventListener('dragleave', handleDragLeave, false);
    li.addEventListener('drop', handleDrop, false);
  });

  // Initialize order display
  updateOrderDisplay();

  // If items are added dynamically later, you can re-run this wiring or use delegation.
})();
