-- Copyright (C) ---Put here your own copyright and developer email---
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version.
--
-- This program is distributed in the hope that it will be useful,
-- but WITHOUT ANY WARRANTY; without even the implied warranty of
-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
-- GNU General Public License for more details.
--
-- You should have received a copy of the GNU General Public License
-- along with this program.  If not, see https://www.gnu.org/licenses/.


-- BEGIN MODULEBUILDER INDEXES
ALTER TABLE llx_istock_authentification ADD INDEX idx_istock_authentification_rowid (rowid);
-- END MODULEBUILDER INDEXES

--ALTER TABLE llx_istock_authentification ADD UNIQUE INDEX uk_istock_authentification_fieldxy(fieldx, fieldy);

--ALTER TABLE llx_istock_authentification ADD CONSTRAINT llx_istock_authentification_fk_field FOREIGN KEY (fk_field) REFERENCES llx_istock_myotherobject(rowid);
ALTER TABLE llx_istock_authentification ADD CONSTRAINT llx_istock_authentification_fk_user FOREIGN KEY (fk_user) REFERENCES llx_user(rowid);

