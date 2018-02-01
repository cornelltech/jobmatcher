export interface Invitation {
    uuid                :string;
    target              :string; // email
    permissionScope     :'recruiter' | 'student'; // permissions
    affiliationId       :string;
    isSent              :boolean;
    name                ?:string;
}