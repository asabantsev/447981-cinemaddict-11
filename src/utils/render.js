export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = {
  [RenderPosition.BEFOREBEGIN]: (container, component) => container.before(component.getElement()),
  [RenderPosition.BEFOREEND]: (container, component) => container.append(component.getElement()),
  [RenderPosition.AFTERBEGIN]: (container, component) => container.prepend(component.getElement()),
  [RenderPosition.AFTEREND]: (container, component) => container.after(component.getElement()),
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
