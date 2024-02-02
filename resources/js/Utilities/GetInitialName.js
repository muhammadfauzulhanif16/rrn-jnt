export const GetInitialName = (name) => {
    const splitName = name.split(" ");
    if (splitName.length === 1) return splitName[0][0];
    return splitName[0][0] + splitName[splitName.length - 1][0];
};
