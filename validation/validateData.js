module.exports = function validateData(data) {
    // Check for top-level object and required properties
    if (typeof data !== 'object' || data === null ||
        typeof data.title !== 'string' ||
        typeof data.chapter !== 'string' ||
        typeof data.text !== 'string' ||
        !Array.isArray(data.sections) ||
        !Array.isArray(data.references)
    ) {
        return false;
    }

    // Check the structure of the headerImage
    if (typeof data.headerImage !== 'object' || data.headerImage === null ||
        typeof data.headerImage.src !== 'string' ||
        typeof data.headerImage.alt !== 'string'
    ) {
        return false;
    }

    // Check the structure of each section
    for (let section of data.sections) {
        // A section must have at least one valid content type
        if (typeof section.subtitle !== 'string' &&
            typeof section.text !== 'string' &&
            !section.image &&
            !section.video &&
            !Array.isArray(section.people)) {
            return false;
        }

        // Check if a section has an image and validate its properties
        if (section.image) {
            if (typeof section.image.src !== 'string' ||
                typeof section.image.alt !== 'string'
            ) {
                return false;
            }
        }
        
        // Check if a section has a video and validate its type
        if (section.video) {
            if (typeof section.video !== 'string') {
                return false;
            }
        }

        // Check if a section has a people array and validate its content
        if (Array.isArray(section.people)) {
            for (let person of section.people) {
                // The 'name' property is no longer required.
                if (typeof person.image !== 'string' ||
                    (person.bio && typeof person.bio !== 'string')) {
                    return false;
                }
            }
        }
    }

    // Check the structure of the references. A reference must have either a 'text' OR a 'url'
    for (let reference of data.references) {
        if (typeof reference.text !== 'string' && typeof reference.url !== 'string') {
            return false;
        }
    }


    return true;
};
