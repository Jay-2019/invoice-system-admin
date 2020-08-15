import { courseFeeDueDateDocumentId } from "../../constant";

const { SC, ST, OBC, UR } = courseFeeDueDateDocumentId;

const mapCasteWithDocumentId = (caste) => {

    switch (caste) {
        case "SC":
            return SC;

        case "ST":
            return ST;

        case "OBC":
            return OBC;

        case "UR":
            return UR

        default:
            return null;

    }

};

export { mapCasteWithDocumentId };