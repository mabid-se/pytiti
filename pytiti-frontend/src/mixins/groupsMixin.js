export default {
  methods: {
    findGroup(uuid) {
      return this.data[this.groupsKey].find((ff) => ff.uuid == uuid);
    },
    findElement(uuidGroup, uuidElement) {
      const currentGroup = this.findGroup(uuidGroup);
      return currentGroup[this.elementsGroupKey].find(
        (e) => e.uuid == uuidElement
      );
    },
    findElementIndex(uuidGroup, uuidElement) {
      const currentGroup = this.findGroup(uuidGroup);
      return currentGroup[this.elementsGroupKey].findIndex(
        (e) => e.uuid == uuidElement
      );
    },
    updateElement(uuidGroup, uuidElement, newElement) {
      const currentGroup = this.findGroup(uuidGroup);
      const indexElement = this.findElementIndex(uuidGroup, uuidElement);
      currentGroup[this.elementsGroupKey][indexElement] = { ...newElement };
    },
    editGroup(uuid, newOptions) {
      const group = this.data[this.groupsKey].find((ff) => ff.uuid == uuid);
      Object.assign(group, newOptions);
    },
    insertGroupAtIndex(index, newGroup) {
      if (index < this.data[this.groupsKey].length) {
        for (let i = index; i < this.data[this.groupsKey].length; i++) {
          const a = this.data[this.groupsKey][i];
          a[this.groupsSortKey] = a[this.groupsSortKey] + 1;
        }
      }
      this.data[this.groupsKey].push(newGroup);
    },
    insertElementToGroup(index, uuidGroup, newElement) {
      const currentGroup = this.data[this.groupsKey].find(
        (ff) => ff.uuid == uuidGroup
      );
      if (index < currentGroup[this.elementsGroupKey].length) {
        for (
          let i = index;
          i < currentGroup[this.elementsGroupKey].length;
          i++
        ) {
          const a = currentGroup[this.elementsGroupKey][i];
          a.order = a.order + 1;
        }
      }
      currentGroup[this.elementsGroupKey].push(newElement);
    },
    toggleGroup(uuidGroup) {
      const currentGroup = this.findGroup(uuidGroup);
      currentGroup.show = !currentGroup.show;
    },
    toggleElement(uuidGroup, uuidElement) {
      const currentElement = this.findElement(uuidGroup, uuidElement);
      currentElement.show = !currentElement.show;
    },
    reorderGroups(evt, group) {
      if (group === this.nameGroupGroupsSortable) {
        let target = null,
          start = null;
        document.getElementsByClassName("nested-1").forEach((nested1) => {
          const uuid = nested1.dataset.uuid;
          const lengthDom = nested1.getElementsByClassName("nested-2").length;
          const lengthArray = this.data[this.groupsKey].find(
            (ff) => ff.uuid == uuid
          )[this.elementsGroupKey].length;
          if (lengthDom == lengthArray + 1) {
            target = uuid;
          }
          if (lengthDom == lengthArray - 1) {
            start = uuid;
          }
        });

        if (target && start) {
          const group = this.data[this.groupsKey].find(
            (f) => f.uuid == evt.item.dataset.uuidparent
          );
          const fieldToDelete = group[this.elementsGroupKey].find(
            (f) => f.uuid == evt.item.dataset.uuid
          );

          group[this.elementsGroupKey] = group[this.elementsGroupKey]
            .filter((f) => f.uuid != fieldToDelete.uuid)
            .map((f, index) => ({ ...f, order: index }));

          fieldToDelete.order = evt.newIndex;

          const targetGroupRef = this.data[this.groupsKey].find(
            (f) => f.uuid == target
          );

          const targetGroup = this.groupsSorted.find((f) => f.uuid == target);

          if (evt.newIndex < targetGroup[this.elementsGroupKey].length) {
            for (
              let i = evt.newIndex;
              i < targetGroup[this.elementsGroupKey].length;
              i++
            ) {
              const a = targetGroup[this.elementsGroupKey][i];
              const ff = targetGroupRef[this.elementsGroupKey].find(
                (f) => f.uuid == a.uuid
              );
              ff.order = ff.order + 1;
            }
          }
          targetGroupRef[this.elementsGroupKey].push(fieldToDelete);
        } else {
          const currentFormFieldSorted = this.groupsSorted.find(
            (f) => f.uuid == evt.item.dataset.uuidparent
          );

          const sortedA =
            currentFormFieldSorted[this.elementsGroupKey][evt.oldIndex];
          const sortedB =
            currentFormFieldSorted[this.elementsGroupKey][evt.newIndex];

          const currentFormField = this.data[this.groupsKey].find(
            (f) => f.uuid == evt.item.dataset.uuidparent
          );

          const a = currentFormField[this.elementsGroupKey].find(
            (f) => f.uuid == sortedA.uuid
          );
          const b = currentFormField[this.elementsGroupKey].find(
            (f) => f.uuid == sortedB.uuid
          );
          const oldOrder = a.order;
          a.order = b.order;
          b.order = oldOrder;
        }
      }
      if (group === this.nameGroupElementsSortable) {
        const sortedA = this.groupsSorted[evt.oldIndex];
        const sortedB = this.groupsSorted[evt.newIndex];
        const a = this.data[this.groupsKey].find((f) => f.uuid == sortedA.uuid);
        const b = this.data[this.groupsKey].find((f) => f.uuid == sortedB.uuid);
        const oldOrder = a.order;
        a.order = b.order;
        b.order = oldOrder;
      }
    },
  },
  computed: {
    groupsSorted() {
      return [...this.data[this.groupsKey]]
        .map((ff) => ({
          ...ff,
          [this.elementsGroupKey]: ff[this.elementsGroupKey].sort(
            (a, b) =>
              a[this.elementsGroupSortKey] - b[this.elementsGroupSortKey]
          ),
        }))
        .sort((a, b) => a[this.groupsSortKey] - b[this.groupsSortKey]);
    },
  },
};
