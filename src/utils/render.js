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

const RenderPositionCase = {
  afterend: (container, component) => {
    container.after(component.getElement());
  },
  beforeend: (container, component) => {
    container.append(component.getElement());
  },
  afterbegin: (container, component) => {
    container.prepend(component.getElement());
  },
  beforebegin: (container, component) => {
    container.before(component.getElement());
  },
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      RenderPositionCase.afterend(container, component);
      break;
    case RenderPosition.BEFOREEND:
      RenderPositionCase.beforeend(container, component);
      break;
    case RenderPosition.AFTERBEGIN:
      RenderPositionCase.afterbegin(container, component);
      break;
    case RenderPosition.BEFOREBEGIN:
      RenderPositionCase.beforebegin(container, component);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
