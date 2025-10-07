// Unit Test - Jest

const validateData = require('../validation/validateData');

describe('Data Validation', () => {

    // Test case for valid data
    test('should return true for a correctly structured JSON object', () => {
        const validData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": {
                "src": "/img/valid.jpg",
                "alt": "Valid Alt Text",
            },
            "sections": [
                {
                    "subtitle": "Section 1",
                    "text": "This is a valid text."
                },
                {
                    "text": "This is another valid text.",
                    "image": {
                        "src": "/img/section_image.jpg",
                        "alt": "Section image alt text"
                    },
                    "video": "https://www.youtube.com/embed/somevideo"
                },
                {
                    "subtitle": "Section with people",
                    "people": [{
                        "image": "/img/johndoe.jpg",
                        "bio": "A short bio about John Doe."
                    }]
                }
            ],
            "references": [
                {
                    "text": "Reference 1",
                    "url": "https://example.com"
                },
                {
                    "text": "Reference 2"
                }
            ]
        };
        expect(validateData(validData)).toBe(true);
    });


    //---> Test cases for missing required top-level fields

    //Missing Title
    test('should return false if the title property is missing', () => {
        const invalidData = {
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Missing Chapter
    test('should return false if the chapter property is missing', () => {
        const invalidData = {
            "title": "A Valid Title",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Missing Text
    test('should return false if the text property is missing', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Missing Header Image
    test('should return false if the headerImage property is missing', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Missing Sections
    test('should return false if the sections property is missing', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Missing References
    test('should return false if the references property is missing', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for invalid top-level properties

    //Invalid Title
    test('should return false if title is not a string', () => {
        const invalidData = {
            "title": 12345,
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //Invalid chapter
    test('should return false if chapter is not a string', () => {
        const invalidData = {
            "title": "A valid Title",
            "chapter": 12345,
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    //Invalid text
    test('should return false if text is not a string', () => {
        const invalidData = {
            "title": "A valid Title",
            "chapter": "A valid chapter",
            "text": 12345,
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    //Invalid headerImage src
    test('should return false if headerImage src is not a string', () => {
        const invalidData = {
            "title": "A valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": 12345, "alt": "Valid Alt Text" },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    //Invalid headerImage alt
    test('should return false if headerImage alt is not a string', () => {
        const invalidData = {
            "title": "A valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": 12345 },
            "sections": [],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    // Invalid sections (not an array)
    test('should return false if sections is not an array', () => {
        const invalidData = {
            "title": "Invalid Data",
            "chapter": "indalid data",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": "not an array",
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    // Invalid references (not an array)
    test('should return false if references is not an array', () => {
        const invalidData = {
            "title": "Invalid Data",
            "chapter": "indalid data",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": "not an array"
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for section validation

    // Test case for invalid section (missing required content)
    test('should return false if a section has no valid content', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "someOtherProp": "value"
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for invalid image in a section

    // Invalid image src
    test('should return false if a section image src is not a string', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "image": { "src": 123, "alt": "Image alt" }
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Invalid image alt
    test('should return false if a section image alt is not a string', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "image": { "src": "/img/image.jpg", "alt": 123 }
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for invalid video

    // Invalid video
    test('should return false if a section video is not a string', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "text": "Some text.",
                    "video": 12345
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for people validation

    // Invalid person image
    test('should return false if a person image is not a string', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "people": [{
                        "image": 12345,
                        "bio": "A short bio."
                    }]
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Invalid person bio (not a string)
    test('should return false if a person bio is not a string', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [
                {
                    "people": [{
                        "image": "/img/janedoe.jpg",
                        "bio": 12345
                    }]
                }
            ],
            "references": []
        };
        expect(validateData(invalidData)).toBe(false);
    });


    //---> Test cases for references validation

    // Invalid reference
    test('should return false if a reference has neither text nor url', () => {
        const invalidData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": [
                { "someOtherProp": "value" }
            ]
        };
        expect(validateData(invalidData)).toBe(false);
    });

    // Valid reference with only text
    test('should return true if a reference has only the text property', () => {
        const validData = {
            "title": "A Valid Title",
            "chapter": "A valid chapter",
            "text": "A valid introductory text.",
            "headerImage": { "src": "/img/valid.jpg", "alt": "Valid Alt Text" },
            "sections": [],
            "references": [{ "text": "Reference with no URL" }]
        };
        expect(validateData(validData)).toBe(true);
    });
});
