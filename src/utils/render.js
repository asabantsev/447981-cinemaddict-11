export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPositionCase = {
  afterbegin: (container, component) => {
    container.prepend(component.getElement());
  },
  beforeend: (container, component) => {
    container.append(component.getElement());
  },
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      RenderPositionCase.afterbegin(container, component);
      break;
    case RenderPosition.BEFOREEND:
      RenderPositionCase.beforeend(container, component);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
